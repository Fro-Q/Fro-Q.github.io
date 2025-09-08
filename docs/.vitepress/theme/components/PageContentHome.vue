<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePostFilters } from '../../utils/usePostFilters'
import LinkUnderline from './LinkUnderline.vue' // Keep LinkUnderline for category navigation
import PostListSection from './PostListSection.vue' // Import the new PostListSection component

const { getAllYears, allPosts } = usePostFilters()

// Define categories for post filtering, including a 'All' category.
const categories: string[] = ['全', ...usePostFilters().allUniqueCategories.value]

// Reactive state to control the visibility of post excerpts for each category.
const excerptVisible = ref(Object.fromEntries(categories.map(category => [category, false])))

// Helper function to filter posts by category for PostListSection
function getPostsForCategory(category: string) {
  return category === '全' ? allPosts.value : allPosts.value.filter(post => post.frontmatter.category === category)
}
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
            un-border-b="2px emerald-600 dark:emerald-400"
            un-outline-none
            un-text-center
            un-font-thin
            un-inline-block
            un-max-w-full
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
      class="title-wrapper"
      un-sticky
      un-top-0
      un-py-10
      un-z-10
      un-bg="neutral-50 dark:neutral-950"
    >
      <div
        class="progress-bar"
      >
        <div
          class="progress-bar-inner"
          un-bg="neutral-600 dark:neutral-400"
          :style="{ width: 'var(--progress-bar-width, 0)' }"
          un-h-2px
          un-absolute
          un-bottom-0
          un-z-1
        />
        <div
          class="progress-bar-bg"
          un-bg="neutral-200 dark:neutral-800"
          un-w-full
          un-h-2px
          un-absolute
          un-z-0
          un-bottom-0
        />
      </div>
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
        un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 2xl"
        un-before="bg-rose-600 dark:bg-rose-400"
        un-italic
      />
    </div>
  </un-page-content>

  <PostListSection
    v-for="category in categories"
    :key="category"
    :category="category"
    :posts="getPostsForCategory(category)"
    :excerpt-visible="excerptVisible[category]"
    :get-all-years="getAllYears"
    :title="category"
    :show-excerpt-toggle="true"
    @update:excerpt-visible="value => excerptVisible[category] = value"
  />
</template>
