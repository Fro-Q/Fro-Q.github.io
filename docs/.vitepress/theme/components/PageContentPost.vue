<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import MarkdownItMathjax3 from 'markdown-it-mathjax3'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as posts } from '../src/posts.data'
import LinkUnderline from './LinkUnderline.vue'

function renderMdInline(text: string | undefined) {
  if (!text) {
    return ''
  }
  const md = new MarkdownIt()
    .use(MarkdownItMathjax3)
  return md.renderInline(text)
}

const { frontmatter } = useData()

const post = posts.filter(post => post.frontmatter.title === frontmatter.value.title)[0]

const metaStrings = [
  new Date(post.created.raw).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  `约${post.readingTime}分钟`,
]

const pool = computed(() => {
  let _ = posts.filter(p => p.frontmatter.category === post.frontmatter.category)
  if (post.frontmatter.series) {
    _ = _.filter(p => p.frontmatter.series === post.frontmatter.series)
  }

  return _
})

const nextPost = computed(() => {
  if (pool.value.indexOf(post) === 0) {
    return null
  }
  return pool.value[pool.value.indexOf(post) - 1]
})

const prevPost = computed(() => {
  if (pool.value.indexOf(post) === pool.value.length - 1) {
    return null
  }
  return pool.value[pool.value.indexOf(post) + 1]
})
</script>

<template>
  <un-page-content>
    <div
      un-my-10
      un-text="5xl/relaxed"
      un-max-w-full
      class="markdown-rendered"
      v-html="renderMdInline(post.frontmatter.title)"
    />
    <div
      un-flex
      un-gap-5
      un-justify-end
      un-items-center
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
    <div
      un-py-20
    >
      <div
        un-flex="~ row"
      >
        <div
          un-text="neutral-500 dark:neutral-400 base"
          un-mr-2
          un-whitespace-nowrap
        >
          前文
        </div>
        <LinkUnderline
          v-if="prevPost"
          :href="prevPost.url"
          :text="prevPost.frontmatter.title"
          :tooltip="true"
          :tooltip-text="prevPost.frontmatter.title"
          un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50"
          un-before="bg-emerald-600 dark:bg-emerald-600/80"
        >
          <template #tooltipAddons>
            <div
              un-flex="~ row"
              un-text="sm neutral-600 dark:neutral-400"
              un-justify-end
              un-gap-5
            >
              {{ `约${prevPost.readingTime.toString()}分钟` }}
            </div>
          </template>
        </LinkUnderline>
        <div
          v-else
        >
          没了
        </div>
      </div>
      <div
        un-flex="~ row"
      >
        <div
          un-text="neutral-500 dark:neutral-400 base"
          un-mr-2
          un-whitespace-nowrap
        >
          后文
        </div>
        <LinkUnderline
          v-if="nextPost"
          :href="nextPost.url"
          :text="nextPost.frontmatter.title"
          :tooltip="true"
          :tooltip-text="nextPost.frontmatter.title"
          un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50"
          un-before="bg-emerald-600 dark:bg-emerald-600/80"
        >
          <template #tooltipAddons>
            <div
              un-flex="~ row"
              un-text="sm neutral-600 dark:neutral-400"
              un-justify-end
              un-gap-5
            >
              {{ `约${nextPost.readingTime.toString()}分钟` }}
            </div>
          </template>
        </LinkUnderline>
        <div
          v-else
        >
          没了
        </div>
      </div>
    </div>
  </un-page-content>
</template>
