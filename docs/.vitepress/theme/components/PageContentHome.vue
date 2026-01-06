<script setup lang="ts">
import { usePostFilters } from '../../utils/usePostFilters'
import LinkUnderline from './LinkUnderline.vue'
import PostListSection from './PostListSection.vue'
import ProgressBarHeader from './ProgressBarHeader.vue'

const { generatePostList } = usePostFilters()

const categoriesPostList = generatePostList('category', 'chineseYear')
const allPostsList = generatePostList('-', 'chineseYear')

// Define categories for post filtering, including a 'All' category.
const categories: string[] = ['全', ...usePostFilters().allUniqueCategories.value]

// Use Markdown-it plugin to render ruby annotations
const froQRaw = '{froQ|フロック}'
const md = new MarkdownIt().use(MarkdownItRuby)
const froQRendered = md.renderInline(froQRaw)
</script>

<template>
  <un-page-content un-min-h-100vh>
    <div

      un-text="neutral-700 dark:neutral-300 3xl"
      un-h="[calc(100vh-100px)]"
      un-flex="~ col grow-1"
      un-justify-center
      un-select-none
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

            un-border-b="2px emerald-600 dark:emerald-400"

            un-appearance-none
            un-inline-block
            un-max-w-full
            un-relative
            un-z-20
            un-rounded-none
            un-bg-transparent
            un-outline-none
            un-text-center
            un-font-thin
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
    <ProgressBarHeader
      id="目录"
      title="目录"
    />
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
        un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 2xl"
        un-before="bg-rose-600 dark:bg-rose-400"
        un-italic
      />
    </div>
  </un-page-content>

  <ClientOnly>
    <PostListSection
      :show-title="true"
      :posts="allPostsList"
      :show-excerpt-toggle="true"
      :date-formatter="(date: Date) => {
        return new Date(date).toLocaleDateString('zh-CN', {
          month: 'long',
          day: 'numeric',
        })
      }"
      :group-title-mapping="{
        '-': '全',
      }"
    />
    <PostListSection
      :show-title="true"
      :posts="categoriesPostList"
      :show-excerpt-toggle="true"
      :date-formatter="(date: Date) => {
        return new Date(date).toLocaleDateString('zh-CN', {
          month: 'long',
          day: 'numeric',
        })
      }"
    />
  </ClientOnly>
</template>
