import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTagify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import contacts from './docs/.vitepress/theme/src/contacts.json' assert { type: 'json' }

const safeIcons = contacts.map(c => c.iconUno)
const safeColors = contacts.map(c => c.colorUno)

export default defineConfig({
  safelist: [
    ...safeIcons,
    ...safeColors.map(c => `border-${c}-500`),
    ...safeColors.map(c => `text-${c}-500`),
    ...safeColors.map(c => `hover:text-${c}-500`),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|css)($|\?)/,
      ],
    },
  },
  shortcuts: {
    'page-content': 'mx-auto max-w-[700px] block',
  },
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json', { with: { type: 'json' } }).then(i => i.default as any),
        ph: () => import('@iconify-json/ph/icons.json', { with: { type: 'json' } }).then(i => i.default as any),
      },
    }),
    presetAttributify({
      strict: true,
      prefixedOnly: true,
      prefix: 'un-',
    }),
    presetTagify({
      prefix: 'un-',
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  layers: {
    default: 0,
    components: 1,
    utilities: 2,
  },
})
