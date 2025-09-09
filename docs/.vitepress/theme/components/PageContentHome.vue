<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePostFilters } from '../../utils/usePostFilters'
import LinkUnderline from './LinkUnderline.vue' // Keep LinkUnderline for category navigation
import PostListSection from './PostListSection.vue' // Import the new PostListSection component
import ProgressBarHeader from './ProgressBarHeader.vue'

const { getAllYears, allPosts } = usePostFilters()

console.warn('allPosts', allPosts.value[1].frontmatter.title)

// Define categories for post filtering, including a 'All' category.
const categories: string[] = ['全', ...usePostFilters().allUniqueCategories.value]

// Reactive state to control the visibility of post excerpts for each category.
const excerptVisible = ref(Object.fromEntries(categories.map(category => [category, false])))

// Helper function to filter posts by category for PostListSection
function getPostsForCategory(category: string) {
  return category === '全' ? allPosts.value : allPosts.value.filter(post => post.frontmatter.category === category)
}

onMounted(() => {
  console.warn('allPosts', allPosts.value[1].frontmatter.title)
})
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
  </ClientOnly>
</template>
