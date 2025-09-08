<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import PageContentHome from './PageContentHome.vue'
import PageContentNotFound from './PageContentNotFound.vue'
import PageContentPost from './PageContentPost.vue'
import PageContentTag from './PageContentTag.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <ClientOnly v-if="frontmatter.home">
    <PageContentHome />
  </ClientOnly>
  <PageContentNotFound v-else-if="page.isNotFound" />
  <PageContentTag
    v-else-if="frontmatter.tag"
  />
  <PageContentPost
    v-else
  />
</template>
