<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { data as posts } from '../src/posts.data'
import LinkUnderline from './LinkUnderline.vue'

const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 3)

function formatDate(post: Data) {
  return new Date(post.created.raw).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <h1
    un-text="align-right 400px rose-500/10"
    un-font="900"
    un-absolute
    un-right-0
    un-bottom-0
    un-select-none
    un-z-0
  >
    404
  </h1>
  <un-page-content
    un-relative
    un-z-1
  >
    <div
      un-text="2xl neutral-800 dark:neutral-200"
      un-my-10
      un-flex="~ row"
    >
      您其实不应该出现在<span
        un-text-rose-500
      >这里</span> /
    </div>
    <div
      un-text="2xl neutral-700 dark:neutral-300"
      un-my-10
      un-flex="~ row"
    >
      如果您通过任何内部链接到达这里,请
      <LinkUnderline
        un-align-base
        href="/posts/get_along/"
        text="联系我"
        un-text="emerald-500"
        un-before="bg-emerald-600 dark:bg-emerald-400"
      />
    </div>
    <div
      un-text="2xl neutral-600 dark:neutral-400"
      un-my-10
      un-flex="~ row"
    >
      或者这里有一些
      <LinkUnderline
        un-align-base
        href="/#%E5%85%A8"
        text="文章"
        un-text="cyan-500"
        un-before="bg-cyan-600 dark:bg-cyan-600/80"
      />
      您可能会感兴趣:
    </div>
    <div
      v-for="post in randomPosts"
      :key="post.url"
      un-p-2
      un-ml-15
      un-flex="~ col"
      un-gap-2
      un-items-end
      un-relative
    >
      <div
        un-flex="~ row"
        un-items-center
        un-max-w-full
      >
        <div
          un-text="neutral-500 dark:neutral-400 base"
          un-mr-2
          un-whitespace-nowrap
        >
          {{ formatDate(post) }}
        </div>
        <LinkUnderline
          :href="post.url"
          :text="post.frontmatter.title"
          :tooltip="true"
          :tooltip-text="post.frontmatter.title"
          un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 2xl"
          un-before="bg-emerald-600 dark:bg-emerald-600/80"
          un-text-align="right"
        >
          <template #tooltipAddons>
            <div
              un-flex="~ row"
              un-text="sm neutral-600 dark:neutral-400"
              un-justify-end
              un-gap-5
            >
              {{ `约${post.readingTime.toString()}分钟` }}
            </div>
          </template>
        </LinkUnderline>
      </div>
      <div
        un-text-neutral-500
        class="markdown-rendered"
        v-html="post.excerpt?.replace(/<p>|<\/p>/g, '')"
      />
    </div>
  </un-page-content>
</template>
