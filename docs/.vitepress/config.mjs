import { defineConfig, defineConfigWithTheme } from "vitepress";
import { RssPlugin } from "vitepress-plugin-rss";
import markdownItFootnote from "markdown-it-footnote";
import markdownItMark from "markdown-it-mark";
import anchor from "markdown-it-anchor";
import { transformerMetaHighlight, transformerNotationWordHighlight, transformerMetaWordHighlight } from "@shikijs/transformers";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { createFileSystemTypesCache } from "@shikijs/vitepress-twoslash/cache-fs";

import { transformerNotationFold } from "./theme/utils/customTransformers";

const rssOptions = {
  baseUrl: "https://fro-blo.com/",
  title: "froQ",
  language: "zh-cn",
  author: {
    name: "froQ",
    email: "froqqq@outlook.com",
    link: "https://fro-blo.com/",
  },
  icon: false,
  copyRight: "CopyRight © 2023-present, froQ",
};

export default defineConfigWithTheme({
  head: [
    [
      "link",
      { rel: "icon", href: "/favicon.ico" },
    ],
  ],
  vite: {
    plugins: [RssPlugin(rssOptions)],
  },
  title: "froQ",
  description: "froQ's personal blog",
  appearance: "true",
  lang: "zh-CN",
  base: "/",
  cleanUrls: true,

  // markdown files to be excluded when building
  srcExclude: [
    "**/README.md",
    "**/_dictionary.md",
    "**/_template/*.md",
  ],
  metaChunks: true,

  themeConfig: {
    email: "froqqq@outlook.com",
    github: "https://github.com/Fro-Q",
    contacts: [
      {
        type: "mastodon",
        text: "Mastodon",
        links: [
          { link: "https://fairy.id/@froq", text: "@froq@fairy.id" },
          { link: "https://moresci.sale/@_froQ_", text: "@_froQ_@moresci.sale" },
          { link: "https://m.otter.homes/@froQ", text: "@froQ@m.otter.homes" },
        ],
        icon: {
          svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' display='inline-block' height='1.0em' width='1.0em' vertical-align='text-bottom'><path fill='currentColor' d='M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z'/></svg>",
        },
        tailwindColor: { light: "#8b5cf6", dark: "#a78bfa" },
      },
      {
        type: "email",
        text: "Email",
        links: [{ link: "mailto:froqqq@outlook.com", text: "@outlook" }],
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M23 20V6l-11 9L1 6v14zm-11-8l10-8H2z"/></svg>',
        },
        tailwindColor: { light: "#0ea5e9", dark: "#38bdf8" },
      },
      {
        type: "github",
        text: "GitHub",
        links: [{ link: "https://github.com/Fro-Q", text: "@Fro-Q" }],
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" display="inline-block" height="1.0em" width="1.0em" vertical-align="text-bottom"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
        },
        tailwindColor: { light: "#404040", dark: "#a3a3a3" },
      },
      {
        type: "wechat",
        text: "（甚至）WeChat",
        links: [{ link: "", text: "@_froq_" }],
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 1728"><path fill="currentColor" d="M580 429q0-41-25-66t-66-25q-43 0-76 25.5T380 429q0 39 33 64.5t76 25.5q41 0 66-24.5t25-65.5m743 507q0-28-25.5-50t-65.5-22q-27 0-49.5 22.5T1160 936q0 28 22.5 50.5t49.5 22.5q40 0 65.5-22t25.5-51m-236-507q0-41-24.5-66T997 338q-43 0-76 25.5T888 429q0 39 33 64.5t76 25.5q41 0 65.5-24.5T1087 429m635 507q0-28-26-50t-65-22q-27 0-49.5 22.5T1559 936q0 28 22.5 50.5t49.5 22.5q39 0 65-22t26-51m-266-397q-31-4-70-4q-169 0-311 77T851.5 820.5T770 1108q0 78 23 152q-35 3-68 3q-26 0-50-1.5t-55-6.5t-44.5-7t-54.5-10.5t-50-10.5l-253 127l72-218Q0 933 0 646q0-169 97.5-311t264-223.5T725 30q176 0 332.5 66t262 182.5T1456 539m592 561q0 117-68.5 223.5T1794 1517l55 181l-199-109q-150 37-218 37q-169 0-311-70.5T897.5 1364T816 1100t81.5-264T1121 644.5t311-70.5q161 0 303 70.5t227.5 192T2048 1100"/></svg>',
        },
        tailwindColor: { light: "#07c160", dark: "#34d058" },
      },
    ],
    socialLinks: [
      {
        ariaLabel: "GitHub",
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/><path d="M14.333 19v-1.863c.025-.31-.018-.62-.126-.913a2.2 2.2 0 0 0-.5-.781c2.093-.227 4.293-1 4.293-4.544a3.48 3.48 0 0 0-1-2.434a3.2 3.2 0 0 0-.06-2.448s-.787-.227-2.607.961a9.15 9.15 0 0 0-4.666 0c-1.82-1.188-2.607-.96-2.607-.96A3.2 3.2 0 0 0 7 8.464a3.48 3.48 0 0 0-1 2.453c0 3.519 2.2 4.291 4.293 4.544a2.2 2.2 0 0 0-.496.773a2.1 2.1 0 0 0-.13.902V19"/><path d="M9.667 17.702c-2 .631-3.667 0-4.667-1.948"/></g></svg>',
        },
        link: "https://github.com/Fro-Q",
      },
      {
        ariaLabel: "RSS",
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" display="inline-block" height="1.2em" width="1.2em" vertical-align="text-bottom"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm5 3a10 10 0 0 0-2 .188v2.062a8 8 0 0 1 2-.25c4.41 0 8 3.59 8 8a8 8 0 0 1-.25 2h2.063A10 10 0 0 0 22 20c0-5.516-4.484-10-10-10m0 4a6 6 0 0 0-2 .344v2.219A3.97 3.97 0 0 1 12 16c2.207 0 4 1.793 4 4c0 .73-.219 1.41-.563 2h2.22A6 6 0 0 0 18 20c0-3.309-2.691-6-6-6m0 4a1.999 1.999 0 1 0 0 4a1.999 1.999 0 1 0 0-4"/></svg>',
        },
        link: "https://fro-blo.com//feed.rss",
      },
      {
        ariaLabel: "Mastodon",
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M7 13.5V9c0-3 5-3 5 0v3m5 1.5V9c0-3-5-3-5 0v3"/><path d="M8 17c7.5 1 13 0 13-4V9c0-5.5-4-6.5-6-6.5H9c-3 0-6.067 1-5.863 6.5c.074 1.987.036 4.385.363 7c1 8 10.5 5.5 12 5v-1.5S7.5 21 8 17"/></g></svg>',
        },
        link: "https://elk.zone/fairy.id/@froq",
      },
    ],
    navUtils: [
      {
        ariaLabel: "Dark Mode",
        id: "darkMode",
        className: "dark",
        icon: {
          svg: {
            on: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19H8a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2m9-4h-1.16A8.2 8.2 0 0 0 20 12.05a1 1 0 0 0-.34-.93a1 1 0 0 0-1-.19a6 6 0 0 1-1.92.32a6.06 6.06 0 0 1-6.06-6a7 7 0 0 1 .1-1a1 1 0 0 0-.35-.92a1 1 0 0 0-1-.18A8.06 8.06 0 0 0 4 10.68A8 8 0 0 0 5.27 15H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2m-3.72 0H7.83a6 6 0 0 1 .88-9.36a8.06 8.06 0 0 0 8.05 7.61a7 7 0 0 0 .79 0A6.1 6.1 0 0 1 16.28 15M16 19h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2"/></svg>',
            off: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.66 8.34a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.66.71a1 1 0 0 0 0 1.41a1 1 0 0 0 .66.29M12 6a1 1 0 0 0 1-1V4a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1m-8 6H3a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m1.64-3.95a1 1 0 0 0 .7.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41ZM21 12h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m-10 7H8a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2m7-4h-.88a5.4 5.4 0 0 0 .38-2a5.5 5.5 0 0 0-11 0a5.4 5.4 0 0 0 .38 2H6a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2m-3.15 0h-5.7a3.44 3.44 0 0 1-.65-2a3.5 3.5 0 0 1 7 0a3.44 3.44 0 0 1-.65 2M16 19h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2"/></svg>',
          },
        },
      },
      {
        ariaLabel: "Color Mode",
        id: "colorMode",
        className: "color",
        icon: {
          svg: {
            on: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.51 9.54a1.9 1.9 0 0 1-1 1.09A7 7 0 0 0 15.37 17q.002.707.14 1.4a2.16 2.16 0 0 1-.31 1.65a1.8 1.8 0 0 1-1.21.8q-.804.15-1.62.15a9 9 0 0 1-9-9.28A9.05 9.05 0 0 1 11.85 3h.51a9 9 0 0 1 8.06 5a2 2 0 0 1 .09 1.52z"/><path stroke-linecap="round" stroke-linejoin="round" d="m8 16.01l.01-.011M6 12.01l.01-.011M8 8.01l.01-.011M12 6.01l.01-.011M16 8.01l.01-.011"/></g></svg>',
            off: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.51 9.54a1.9 1.9 0 0 1-1 1.09A7 7 0 0 0 15.37 17q.002.707.14 1.4a2.16 2.16 0 0 1-.31 1.65a1.8 1.8 0 0 1-1.21.8q-.804.15-1.62.15a9 9 0 0 1-9-9.28A9.05 9.05 0 0 1 11.85 3h.51a9 9 0 0 1 8.06 5a2 2 0 0 1 .09 1.52z"/><path stroke-linecap="round" stroke-linejoin="round" d="m8 16.01l.01-.011M6 12.01l.01-.011M8 8.01l.01-.011M12 6.01l.01-.011M16 8.01l.01-.011"/></g></svg>',
          },
        },
      },
    ],
  },
  markdown: {
    anchor: {
      permalink: anchor.permalink.headerLink(),
    },
    toc: {
      level: [
        2,
        3,
        4,
        5,
      ],
      // format: (str) => {},
    },
    math: true,
    config: (md) => {
      md.use(markdownItFootnote);
      md.use(markdownItMark);
    },
    theme: {
      light: "vitesse-light",
      dark: "vitesse-black",
    },
    codeTransformers: [
      transformerNotationWordHighlight(),
      transformerMetaWordHighlight(),
      transformerColorizedBrackets(),
      transformerMetaHighlight(),
      transformerTwoslash({
        typesCache: createFileSystemTypesCache(),
      }),
      transformerNotationFold(),
    ],
    container: {
      tipLabel: "点触",
      warningLabel: "备患",
      dangerLabel: "存亡",
      infoLabel: "另言",
      detailsLabel: "深尝",
      // cautionLabel: "留心",
      // importantLabel: "",
      // noteLabel: "留记",
    },
  },
});
