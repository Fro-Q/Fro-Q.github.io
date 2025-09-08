<script setup lang="ts">
import { defaultDocument } from '@vueuse/core'
import mediumZoom from 'medium-zoom'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, onUpdated, ref, watch } from 'vue'
import ButtonVerticalNavigation from './components/ButtonVerticalNavigation.vue'
import PageContent from './components/PageContent.vue'
import PageFooter from './components/PageFooter.vue'
import PageLogo from './components/PageLogo.vue'

import PageNav from './components/PageNav.vue'

const route = useRoute()

function initZoom() {
  mediumZoom('#content figure img', {
    margin: 24,
    background: 'var(--image-mask-bg)',
    container: defaultDocument!.body,
  })
}

onMounted(() => {
  initZoom()
})

watch(
  () => route.path,
  () => nextTick(() => initZoom()),
)
</script>

<template>
  <div
    un-min-h-100vh
    un-bg="neutral-50 dark:neutral-950"
    un-text="neutral-700 dark:neutral-300"
    un-relative
  >
    <PageLogo />
    <PageNav />
    <PageContent :key="route.path" />
    <ButtonVerticalNavigation
      un-hidden
      un-md:flex
    />
    <PageFooter />
  </div>
</template>
