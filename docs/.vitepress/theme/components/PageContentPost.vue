<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from '../src/posts.data'

const { frontmatter } = useData()

const post = posts.filter(post => post.frontmatter.title === frontmatter.value.title)[0]

const metaStrings = [
  post.created.formattedString,
  `约 ${post.readingInfo.words} 字`,
  `${post.readingInfo.minutes} 分钟`,
]
</script>

<template>
  <un-page-content>
    <div
      un-my-10
      un-text="5xl/relaxed"
      un-font-serif
      un-max-w-full
    >
      {{ frontmatter.title }}
    </div>
    <div
      un-mb-5
      un-flex
      un-gap-5
      un-justify-end
      un-font-serif
    >
      <div
        v-for="metaString in metaStrings"
        :key="metaString"
      >
        {{ metaString }}
      </div>
    </div>
    <Content
      id="content"
    />
  </un-page-content>
</template>
