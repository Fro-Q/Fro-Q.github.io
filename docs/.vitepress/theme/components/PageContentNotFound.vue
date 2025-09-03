<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { data as posts } from '../src/posts.data'

const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 3)

function metaStrings(post: Data) {
  return [
    post.created.formattedString,
    `${post.readingTime} 分钟`,
  ]
}
</script>

<template>
  <h1
    un-text="align-right 400px rose-500/10"
    un-font="serif 900"
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
    <p
      un-text="2xl neutral-800 dark:neutral-200"
      un-font="serif"
      un-my-10
    >
      How the hell did you get <span
        un-text-rose-500
      >here</span>?
    </p>
    <p
      un-text="2xl neutral-700 dark:neutral-300"
      un-font="serif"
      un-mb-10
    >
      <a
        href="/posts/get_along/"
        un-text-emerald-500
        un-underline="~ dotted"
        un-hover="rotate-3 scale-105"
        un-duration-200
        un-inline-block
      >Contact me</a> if you got here by an internal link.
    </p>
    <p
      un-text="2xl neutral-600 dark:neutral-400"
      un-font="serif"
      un-mb-10
    >
      or here are some <a
        href="/#%E5%85%A8"
        un-text-cyan-500
        un-underline="~ wavy"
        un-hover="-rotate-3 scale-115"
        un-duration-200
        un-inline-block
      >posts</a> that might interest you:
    </p>
    <div
      v-for="post in randomPosts"
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
