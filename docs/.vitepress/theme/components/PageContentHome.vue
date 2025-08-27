<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { useData } from 'vitepress'
import { data as posts } from '../src/posts.data'
import LinkUnderline from './LinkUnderline.vue'

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
    <div
      un-select-none
      un-text="neutral-700 dark:neutral-300 3xl"
      un-h="[calc(100vh-100px)]"
      un-flex="~ col grow-1"
      un-justify-center
    >
      <div
        un-mb-10
        un-inline
      >
        您好。<br>我是 froQ ，一位

        <div
          un-relative
          un-inline
        >
          <input
            id="self-description"
            type="text"
            un-z-20
            un-appearance-none
            un-rounded-none
            un-bg-transparent
            un-shadow="emerald-500 [0px_2px_0px_0px]"
            un-outline-none
            un-text-center
            un-font-thin
            un-inline
            un-relative
            autocomplete="off"
            maxlength="10"
          >
        </div>
        。
      </div>
      <br>
      <div>
        不太擅长给自己贴标签，或许您能帮我贴一个。
      </div>
    </div>
  </un-page-content>
  <un-page-content un-min-h-100vh>
    <div
      class="gradient-b"
      un-sticky
      un-top-0
      un-py-10
      un-z-10
      un-bg="neutral-50 dark:neutral-950"
      un-border-b="neutral-200 dark:neutral-800 px"
    >
      <h2
        un-my-4
        un-text-4xl
      >
        目录
      </h2>
    </div>
    <div
      v-for="category in categories"
      :key="category"
      un-ml="[25%]"
      un-even="pl-10"
      un-my-10
    >
      <LinkUnderline
        :href="`#${category}`"
        :text="category"
        un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50"
        un-before="bg-rose-600 dark:bg-rose-400 "
        un-text-2xl
        un-italic
      />
    </div>
  </un-page-content>
  <un-page-content
    v-for="category in categories"
    :key="category"
    un-min-h-100vh
  >
    <div
      un-sticky
      un-top-0
      un-py-10
      un-z-10
      un-bg="neutral-50 dark:neutral-950"
      un-border-b="neutral-200 dark:neutral-800 px"
    >
      <h2
        :id="category"
        un-my-4
        un-text-4xl
      >
        {{ category }}
      </h2>
    </div>
    <div
      un-py-10
      un-flex="~ col"
      un-gap-4
      un-items-end
      un-border-r="neutral-800 dark:neutral-200 px"
    >
      <div
        v-for="post in posts.filter(post => category === '全' ? posts : post.frontmatter.category === category)"
        :key="post.url"
        un-p-2
        un-flex="~ col"
        un-gap-2
        un-items-end
      >
        <LinkUnderline
          :href="post.url"
          :text="post.frontmatter.title"
          un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 2xl"
          un-before="bg-emerald-600 dark:bg-emerald-600/80"
          un-text-align="right"
        />
        <!-- <a
          un-text-2xl
          un-text="neutral-600 dark:neutral-400 hover:neutral-900 dark:hover:neutral-100"
          un-transition-colors
          un-duration-200
          :href="post.url"
        >{{ post.frontmatter.title }}</a> -->
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
    </div>
  </un-page-content>
</template>
