<script setup lang="ts">
import { useData } from 'vitepress'
import PageContentHome from './PageContentHome.vue'
import PageContentNotFound from './PageContentNotFound.vue'
import PageContentPost from './PageContentPost.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <PageContentHome v-if="frontmatter.home" />
  <PageContentNotFound v-else-if="page.isNotFound" />
  <PageContentPost v-else />
</template>
