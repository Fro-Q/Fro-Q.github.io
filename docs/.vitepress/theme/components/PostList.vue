<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { onMounted, ref } from 'vue'
import { formatMonthDay } from '../../utils/formatDate'
import { renderMdInline } from '../../utils/renderMdInline'

import LinkUnderline from './LinkUnderline.vue'

defineProps<{
  posts: Data[]
  showExcerpt: boolean
}>()
</script>

<template>
  <div
    un-flex="~ col"
    un-items-end
    un-w-full
  >
    <div
      v-for="post in posts"
      :key="post.frontmatter.title"
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
          {{ formatMonthDay(post.created.raw) }}
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
        v-show="showExcerpt"
        un-text-neutral-500
        class="markdown-rendered"
        v-html="post.excerpt?.replace(/<p>|<\/p>/g, '')"
      />
    </div>
  </div>
</template>
