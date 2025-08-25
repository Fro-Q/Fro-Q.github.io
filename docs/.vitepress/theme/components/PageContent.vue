<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import PageContentContact from './PageContentContact.vue'
import PageContentHome from './PageContentHome.vue'
import PageContentNotFound from './PageContentNotFound.vue'
import PageContentPost from './PageContentPost.vue'

const { page, frontmatter } = useData()
const { path } = useRoute()
</script>

<template>
  <PageContentHome v-if="frontmatter.home" />
  <PageContentContact v-else-if="path === '/contact/'" />
  <PageContentNotFound v-else-if="page.isNotFound" />
  <PageContentPost v-else />
</template>
