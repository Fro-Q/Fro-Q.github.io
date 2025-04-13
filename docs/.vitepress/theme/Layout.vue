<script setup lang="ts">
import PageContent from './components/PageContent.vue'
import PageFooter from './components/PageFooter.vue'
import PageNav from './components/PageNav.vue'
</script>

<template>
  <div class="dark:bg-neutral-900 dark:text-neutral-100 min-h-100vh">
    <PageNav />
    <PageContent />
    <PageFooter />
  </div>
</template>
