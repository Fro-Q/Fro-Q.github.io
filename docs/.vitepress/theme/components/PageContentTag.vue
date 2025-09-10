<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { usePostFilters } from '../../utils/usePostFilters'
// import { useTagUtils } from '../../utils/useTagUtils' // Removed as currentTagHierarchy and extendedTagsForCurrentTag are not used

import LinkUnderline from './LinkUnderline.vue'
import PostListSection from './PostListSection.vue' // Import the new PostListSection component
import PostMetaInfo from './PostMetaInfo.vue'
import TagDisplay from './TagDisplay.vue'

const { params } = useData()

const { postsInCurrentTag, postsInExtendedTags, getAllYears } = usePostFilters()
// const { currentTagHierarchy, extendedTagsForCurrentTag } = useTagUtils() // Removed unused variables

const postsToShow = {
  在此: postsInCurrentTag.value,
  更深处: postsInExtendedTags.value,
}

// Reactive state to control the visibility of post excerpts for each category.
// Reactive state to control the visibility of post excerpts for each category.
const excerptVisible = ref({
  在此: false,
  更深处: false,
})

const metaStrings = computed(() => [
  `${postsInCurrentTag.value.length} 篇在此`,
  `${postsInExtendedTags.value.length} 篇在更深处`,
])
</script>

<template>
  <un-page-content>
    <TagDisplay />
    <PostMetaInfo :meta-strings="metaStrings" />
  </un-page-content>

  <ClientOnly>
    <PostListSection
      category="在此"
      :posts="postsToShow['在此']"
      :excerpt-visible="excerptVisible['在此']"
      :get-all-years="getAllYears"
      title="在此"
      :show-excerpt-toggle="true"
      @update:excerpt-visible="value => excerptVisible['在此'] = value"
    >
      <template #empty-message-addons>
        <div
          un-text="2xl neutral-800 dark:neutral-200"
          un-my-10
          un-flex="~ row"
          un-justify-center
        >
          此处没有任何文章
        </div>
        <div
          un-text="2xl neutral-700 dark:neutral-300"
          un-my-10
          un-flex="~ row"
          un-justify-center
        >
          很可能是由于「{{ params?.tag }}」是一个泛类
        </div>
        <div
          un-text="2xl neutral-600 dark:neutral-400"
          un-my-10
          un-flex="~ row"
          un-justify-center
        >
          您需要看看
          <LinkUnderline
            un-align-base
            href="#更深处"
            text="更深处"
            un-text="cyan-500"
            un-before="bg-cyan-600 dark:bg-cyan-600/80"
          />
        </div>
      </template>
    </PostListSection>
  </ClientOnly>

  <PostListSection
    category="更深处"
    :posts="postsToShow['更深处']"
    :excerpt-visible="excerptVisible['更深处']"
    :get-all-years="getAllYears"
    title="更深处"
    :show-excerpt-toggle="true"
    @update:excerpt-visible="value => excerptVisible['更深处'] = value"
  >
    <template #empty-message-addons>
      <div
        un-text="2xl neutral-800 dark:neutral-200"
        un-my-10
        un-flex="~ row"
        un-justify-center
      >
        没有文章在更深处
      </div>
      <div
        un-text="2xl neutral-700 dark:neutral-300"
        un-my-10
        un-flex="~ row"
        un-justify-center
      />
    </template>
  </PostListSection>
</template>
