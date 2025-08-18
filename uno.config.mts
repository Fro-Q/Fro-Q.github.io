import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTagify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|css)($|\?)/,
      ],
    },
  },
  shortcuts: {
    'page-content': 'mx-auto max-w-[700px] min-h-[calc(100vh-100px)] block',
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
