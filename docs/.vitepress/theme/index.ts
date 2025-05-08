import type { Theme } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import '@unocss/reset/tailwind.css'
import './style.css'
import 'uno.css'
import '@shikijs/vitepress-twoslash/style.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.use(TwoslashFloatingVue)
  },
} satisfies Theme
