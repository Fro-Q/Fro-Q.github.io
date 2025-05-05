import anchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHashtag from 'markdown-it-hashtag'
import markdownItFigures from 'markdown-it-implicit-figures'
import markdownItMark from 'markdown-it-mark'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Example Site',
  description: 'A VitePress Site.',
  vite: {
    plugins: [
      UnoCSS(),
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('un-'),
      },
    },
  },
  markdown: {
    anchor: {
      permalink: anchor.permalink.headerLink(),
    },
    math: true,
    config: (md) => {
      md
        .use(markdownItFootnote)
        .use(markdownItMark)
        .use(markdownItHashtag)
        .use(markdownItFigures, {
          figcaption: true,
        })
    },
  },
})
