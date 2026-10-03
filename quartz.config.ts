import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
    configuration: {
        pageTitle: "hackctl",
        enableSPA: true,
        enablePopovers: true,
        analytics: {
            provider: "plausible",
        },
        locale: "en-US",
        baseUrl: "docs.hackctl.com",
        ignorePatterns: ["private", "templates", ".obsidian"],
        defaultDateType: "created",
        theme: {
            fontOrigin: "googleFonts",
            cdnCaching: true,
            typography: {
                header: "IBM Plex Mono",
                body: "IBM Plex Mono",
                code: "IBM Plex Mono",
            },
            colors: {
                lightMode: {
                    light: "#ffffff",
                    lightgray: "#e4e4e4",
                    gray: "#c4c4c4",
                    darkgray: "#000000",
                    dark: "#171717",
                    secondary: "#000000",
                    tertiary: "#5c5c5c",
                    highlight: "rgba(0, 0, 0, 0.06)",
                    textHighlight: "rgba(0, 0, 0, 0.15)",
                },
                darkMode: {
                    light: "#121212",
                    lightgray: "#313131",
                    gray: "#464646",
                    darkgray: "#ffffff",
                    dark: "#ededed",
                    secondary: "#ffffff",
                    tertiary: "#a0a0a0",
                    highlight: "rgba(255, 255, 255, 0.09)",
                    textHighlight: "rgba(255, 255, 255, 0.25)",
                },
            },
        },
    },
    plugins: {
        transformers: [
            Plugin.FrontMatter(),
            Plugin.SyntaxHighlighting({
                theme: {
                    light: "github-light",
                    dark: "github-dark",
                },
                keepBackground: false,
            }),
            Plugin.ObsidianFlavoredMarkdown({
                enableInHtmlEmbed: false,
            }),
            Plugin.GitHubFlavoredMarkdown(),
            Plugin.TableOfContents(),
            Plugin.CrawlLinks({
                markdownLinkResolution: "shortest",
            }),
            Plugin.Description(),
            Plugin.Latex({
                renderEngine: "katex",
            }),
        ],
        filters: [Plugin.RemoveDrafts()],
        emitters: [
            Plugin.AliasRedirects(),
            Plugin.ComponentResources(),
            Plugin.ContentPage(),
            Plugin.FolderPage(),
            Plugin.TagPage(),
            Plugin.ContentIndex({
                enableSiteMap: true,
                enableRSS: true,
            }),
            Plugin.Assets(),
            Plugin.Static(),
            Plugin.NotFoundPage(),
        ],
    },
}

export default config
