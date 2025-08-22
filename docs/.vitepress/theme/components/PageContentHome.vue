<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { useData } from 'vitepress'
import { data as posts } from '../src/posts.data'

const { site } = useData()

function metaStrings(post: Data) {
  return [
    post.created.formattedString,
    `约 ${post.readingInfo.words} 字`,
    `${post.readingInfo.minutes} 分钟`,
  ]
}

const categories = ['全', ...new Set(posts.map(post => post.frontmatter.category))]
</script>

<template>
  <un-page-content un-min-h-100vh>
    <h1
      un-text="center 4xl"
      un-m-4
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
  </un-page-content>
  <un-page-content un-min-h-100vh>
    <h2
      un-my-4
      un-text-4xl
      un-font-serif
      un-sticky
      un-top-0
      un-py-10
      un-bg="neutral-50 dark:neutral-950"
    >
      目录
    </h2>
    <div
      v-for="category in categories"
      :key="category"
      un-ml="[25%]"
      un-even="pl-10"
      un-my-4
    >
      <a
        :href="`#${category}`"
        un-text-2xl
        un-font-serif
        un-italic
      >{{ category }}</a>
    </div>
  </un-page-content>
  <un-page-content
    un-min-h-100vh
    v-for="category in categories"
    :key="category"
  >
    <h2
      :id="category"
      un-my-4
      un-text-4xl
      un-font-serif
      un-sticky
      un-top-0
      un-py-10
      un-bg="neutral-50 dark:neutral-950"
    >
      {{ category }}
    </h2>
    <div
      v-for="post in posts.filter(post => category === '全' ? posts : post.frontmatter.category === category)"
      :key="post.url"
      un-font-serif
      un-py-2
    >
      <a
        un-text-2xl
        un-text="neutral-600 dark:neutral-400 hover:neutral-900 dark:hover:neutral-100"
        un-transition-colors
        un-duration-200
        :href="post.url"
      >{{ post.frontmatter.title }}</a>
      <p
        un-text-neutral-500
        v-html="post.excerpt"
      />
      <div
        un-text-neutral-500
        un-flex
        un-gap-5
        un-text-sm
      >
        <div
          v-for="metaString in metaStrings(post)"
          :key="metaString"
        >
          {{ metaString }}
        </div>
      </div>
    </div>
  </un-page-content>
</template>
