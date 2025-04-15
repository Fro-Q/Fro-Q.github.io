<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from '../src/posts.data'

const { site } = useData()
</script>

<template>
  <div un-page-content>
    <h1
      un-m-4
      un-text="center 4xl"
    >
      {{ site.title }}
    </h1>
    <div
      un-m-4
      un-min-h="[200px]"
      un-text-center
    >
      <p>{{ site.description }}</p>
    </div>
    <div>
      <div
        v-for="post in posts"
        :key="post.url"
        un-text="neutral-600 dark:neutral-400 hover:neutral-900 dark:hover:neutral-100"
        un-py-2
        un-transition-colors
        un-duration-200
      >
        <a
          un-text-2xl
          :href="post.url"
        >{{ post.frontmatter.title }}</a>
      </div>
    </div>
  </div>
</template>
