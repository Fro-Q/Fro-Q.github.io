import markdownItHashtag from '@fedify/markdown-it-hashtag'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import { transformerMetaWordHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import anchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItFigures from 'markdown-it-implicit-figures'
import markdownItMark from 'markdown-it-mark'
import markdownRuby from 'markdown-it-ruby'
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
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache(),
      }),
      transformerMetaWordHighlight(),
      transformerNotationWordHighlight(),
      transformerColorizedBrackets(),
    ],
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-black',
    },
    toc: {
      level: [2, 3, 4, 5],
    },
    anchor: {
      permalink: anchor.permalink.headerLink(),
    },
    math: true,
    config: (md) => {
      md
        .use(markdownItFootnote)
        .use(markdownItMark)
        .use(markdownItHashtag, {
          link: (tag: string) => `/tags/${tag.substring(1)}`,
        })
        .use(markdownItFigures, {
          figcaption: true,
        })
        .use(markdownRuby)
    },
  },
})
