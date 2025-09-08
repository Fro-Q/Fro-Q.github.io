import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import { transformerMetaWordHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import anchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHashtag from 'markdown-it-hashtag'
import markdownItFigures from 'markdown-it-implicit-figures'
import markdownItMark from 'markdown-it-mark'
import markdownRuby from 'markdown-it-ruby'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: 'Example Site',
  description: 'A VitePress Site.',
  vite: {
    plugins: [
      UnoCSS(),
    ],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
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
      level: [2, 3, 4],
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
          hashtagRegExp: '\\w+(\\/\\w+)*',
        })
        .use(markdownItFigures, {
          figcaption: true,
        })
        .use(markdownRuby)

      md.renderer.rules.hashtag_text = function (tokens, idx) {
        return `${tokens[idx].content}`
      }

      md.renderer.rules.hashtag_open = function (tokens, idx) {
        const tagName = tokens[idx].content.toLowerCase()
        return `<a href="/tags/${tagName}"><span class="tag">`
      }

      md.renderer.rules.hashtag_close = function () {
        return `</span></a>`
      }
    },
  },
})
