# `observec` Installation

The release tar (in private repo releases) contains everything else all binaries, the managed directory structure, and the compiled jar. You only need the following.
## 1. What `observec` needs

| Need                   | Details                                                         |
| ---------------------- | --------------------------------------------------------------- |
| Linux on amd64 / arm64 | Linux-based distro; **Windows is not supported**                |
| JRE 17+                | `java` on `PATH`, version 17 or above; `run.sh` aborts below 17 |
| Git with identity      | `git` on `PATH` plus `user.name` / `user.email` configured      |
| Port `9090` free       | prometheus                                                      |
| Port `9093` free       | alertmanager                                                    |
| Port `9115` free       | blackbox exporter                                               |
| Port `8080` free       | observec jar service (override with `PORT`)                     |
| Port `8081` reserved   | Keep free                                                       |
## 2. Considerations

| Consideration                                                                                                                 | Why it matters                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Set git identity at your home directory before first boot (`git config --global user.name`, `git config --global user.email`) | Otherwise every auto-commit falls back to `observec <observec@local>` and history loses who changed what                   |
| Do **not** extract the release tar inside an existing git repo                                                                | `observecData/` is itself a git repo on boot, and nesting breaks status / commit / push-pull and `safe.directory` handling |
| Extract to a clean path (`~/observec/`, `/opt/observec/`) with no parent `.git`                                               | Check with `git rev-parse --is-inside-work-tree` (should fail) before `./run.sh`                                           |
| Keep `9090`, `9093`, `9115`, `8080` free, `8081` reserved                                                                     | Clashes silently break scraping, alerting, probing, or the service itself                                                  |
## 3. Setup
### Tarball setup

| Step | Action                                                                                                                                                   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Download the tarball for your architecture from the GitHub Release: `observec-linux-amd64.tar.gz` or `observec-linux-arm64.tar.gz`                       |
| 2    | `git rev-parse --is-inside-work-tree`  it should fail (not inside a git repo)                                                                            |
| 3    | `git config --global user.name "your-name"` and `git config --global user.email "you@example.com"`                                                       |
| 4    | `java -version` (must report 17+), `git --version`                                                                                                       |
| 5    | `ss -ltn \| grep -E '8080\|8081\|9090\|9093\|9115'`  empty means free                                                                                    |
| 6    | `./run.sh` first boot creates data dirs, default configs, `users.db`, and the data-dir git repo                                                          |
| 7    | `curl -f http://localhost:8080/`, `curl -f http://localhost:9090/-/healthy`, `curl -f http://localhost:9093/-/healthy`, `curl -f http://localhost:9115/` |
### Docker setup (full image via `observec.yml`)

| Step | Action                                                                |
| ---- | --------------------------------------------------------------------- |
| 1    | `cd /path/to/observec` (repo root with `Dockerfile` + `observec.yml`) |
| 2    | `DOCKER_BUILDKIT=0 docker compose -f observec.yml up --build -d`      |
| 3    | `docker compose -f observec.yml logs -f`                              |
