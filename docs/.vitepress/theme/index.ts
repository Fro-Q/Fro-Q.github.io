import type { Theme } from 'vitepress'
// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import '@unocss/reset/tailwind.css'
import './style.css'
import 'uno.css'

export default {
  Layout,
  enhanceApp() {
    // ...
  },
} satisfies Theme
