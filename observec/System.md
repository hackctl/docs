# File System

```text
observec
├── bin (d)
│   ├── alertmanager (f)
│   ├── amtool (f)
│   ├── blackbox_exporter (f)
│   ├── prometheus (f)
│   └── promtool (f)
├── observec.jar (f)
├── observecData (volume, tracked) (d)
│   ├── alertmanager (d)
│   │   └── alertmanagerData (ignored) (d)
│   ├── blackbox (d)
│   │   ├── blackboxData (ignored) (d)
│   │   └── tls (d)
│   ├── monitors (d)
│   ├── prometheus (d)
│   │   ├── kubeConfigs (d)
│   │   ├── prometheusData (ignored) (d)
│   │   ├── ruleFiles (d)
│   │   │   └── monitors (d)
│   │   └── serviceDiscoveryFiles (d)
│   └── thanos (d)
└── run.sh (f)
```

All the data is located in the directory `/observec` . *Both image and tarball follows this same directory structure*. 

- `/bin` : contains all the compiled binaries including alertmanager, amtool, blackbox_exporter, prometheus, promtool 
- `observec.jar` : The control plane SpringBoot application 
- `run.sh` : only found in tarball setup to run the setup with ease
- `observecData` : Contains all the configuration data and generated data. This directory is tracked by git and will commit under username observec until the global username and email are defined. 
	- `alertmanager` : contains `alertmangerData` which is ignored by git and kept for future use, `alertmanagerConfig.yml` auto generated default when enabled.  
	- `blackbox` : contains `blackboxData` which is ignored by git and kept for future use, `blackboxConfig.yml` auto generated default when enabled. Inside the `tls` directory tls material uploaded is stored. 
	- `prometheus` :  contains `prometheusData` which have all the prometheus generated data, ignored by git. `ruleFiles` contains all the prometheus rule files with organised in respective directory structure created via UI. Similarly `serviceDiscoveryFiles` aprt from that `kubeConfigs`for kubeconfig files for kubernetes monitoring. 
	- `monitors` : contains the monitors data stored in `monitors.json` file.