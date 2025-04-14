import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTagify,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'page-content': 'mx-auto max-w-[700px]',
  },
  // ...UnoCSS options
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetAttributify(),
    presetTagify(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  layers: {
    components: 1,
    utilities: 2,
  },
})
