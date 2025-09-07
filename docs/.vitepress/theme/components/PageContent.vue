<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import PageContentHome from './PageContentHome.vue'
import PageContentNotFound from './PageContentNotFound.vue'
import PageContentPost from './PageContentPost.vue'
import PageContentTag from './PageContentTag.vue'

const { page, frontmatter } = useData()
const { path } = useRoute()
</script>

<template>
  <PageContentHome v-if="frontmatter.home" />
  <PageContentNotFound v-else-if="page.isNotFound" />
  <PageContentTag
    v-else-if="frontmatter.tag"
  />
  <PageContentPost
    v-else
  />
</template>
