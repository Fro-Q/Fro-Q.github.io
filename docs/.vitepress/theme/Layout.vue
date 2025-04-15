<script setup lang="ts">
import PageContent from './components/PageContent.vue'
import PageFooter from './components/PageFooter.vue'
import PageNav from './components/PageNav.vue'
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
