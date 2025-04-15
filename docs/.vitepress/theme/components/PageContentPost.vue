<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div
    un-my-10
    un-text="5xl/relaxed"
    un-page-content
    un-font-serif
  >
    {{ frontmatter.title }}
  </div>
  <content
    id="content"
    un-page-content
  />
</template>
