import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    typescript: true,
    vue: true,
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 },
      }],
    },
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
)
