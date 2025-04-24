<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'
import PageContent from './components/PageContent.vue'
import PageFooter from './components/PageFooter.vue'
import PageNav from './components/PageNav.vue'

const route = useRoute()

function initZoom() {
  mediumZoom('#content p img', {
    margin: 24,
    background: 'var(--image-mask-bg)',
    container: document.body,
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
  >
    <PageNav />
    <PageContent />
    <PageFooter />
  </div>
</template>
