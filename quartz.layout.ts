import { QuartzLayout, PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { h } from "preact"

// empty footer (renders nothing, no css)
const EmptyFooter = (() => {
    const C = () => null
    return C
}) as any

// GitHub logo linking to the docs repo
const GitHubLink = (() => {
    const GitHub = () =>
        h(
            "a",
            {
                href: "https://github.com/hackctl/docs",
                class: "github-link",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Docs repository on GitHub",
            },
            h(
                "svg",
                { viewBox: "0 0 16 16", "aria-hidden": "true" },
                h("path", {
                    d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
                }),
            ),
        )
    GitHub.css = `
.github-link {
  display: flex;
  align-items: center;
  color: var(--darkgray);
}
.github-link svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}
.github-link:hover {
  color: var(--secondary);
}
`
    // pre-seed explorer's saved scroll so its load-time
    // scrollIntoView(activeFile) takes the restore path (no window scroll)
    GitHub.beforeDOMLoaded = "try{sessionStorage.setItem('explorerScrollTop','0')}catch(e){}"
    return GitHub
}) as any

// wide-view toggle: collapses both sidebars so the middle takes full width
const WideToggle = (() => {
    const Wide = () =>
        h(
            "button",
            {
                id: "wide-toggle",
                class: "wide-toggle",
                type: "button",
                "aria-label": "Toggle wide view",
                title: "Toggle wide view",
            },
            h(
                "svg",
                {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                },
                h("path", {
                    d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3",
                }),
            ),
        )
    Wide.css = `
.wide-toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--darkgray);
}
.wide-toggle svg {
  width: 20px;
  height: 20px;
}
.wide-toggle:hover {
  color: var(--secondary);
}
:root[wide="on"] .wide-toggle {
  color: var(--secondary);
}
`
    Wide.beforeDOMLoaded =
        "try{if(localStorage.getItem('wide')==='1')document.documentElement.setAttribute('wide','on')}catch(e){}"
    Wide.afterDOMLoaded = `
const wideBtn = document.getElementById('wide-toggle');
if (wideBtn) wideBtn.onclick = () => {
  const root = document.documentElement;
  const on = root.getAttribute('wide') === 'on';
  try {
    if (on) { root.removeAttribute('wide'); localStorage.setItem('wide', '0'); }
    else { root.setAttribute('wide', 'on'); localStorage.setItem('wide', '1'); }
  } catch (e) {
    if (on) root.removeAttribute('wide'); else root.setAttribute('wide', 'on');
  }
};`
    return Wide
}) as any

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
    head: Component.Head(),
    header: [
        Component.PageTitle(),
        Component.Flex({
            components: [
                {
                    Component: Component.Search(),
                    grow: true,
                    basis: "500px",
                },
                { Component: Component.Darkmode() },
                { Component: GitHubLink() },
                { Component: WideToggle() },
            ],
        }),
    ],    afterBody: [],
    footer: EmptyFooter(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
    beforeBody: [
        Component.Breadcrumbs(),
        Component.ArticleTitle(),
        Component.TagList(),
    ],
    left: [
        Component.Explorer(),
    ],
    right: [
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Backlinks(),
    ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
    beforeBody: [Component.Breadcrumbs()],
    left: [
        Component.Explorer(),
    ],
    right: [],
}
