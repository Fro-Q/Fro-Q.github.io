<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { usePostFilters } from '../../utils/usePostFilters'
import LinkUnderline from './LinkUnderline.vue'
import PostListSection from './PostListSection.vue'
import PostMetaInfo from './PostMetaInfo.vue'
import TagDisplay from './TagDisplay.vue'

const { params } = useData()

const { postsInCurrentTag, postsInExtendedTags, groupByProperty } = usePostFilters()

const postsToShow = {
  在此: groupByProperty('chineseYear', postsInCurrentTag.value),
  更深处: groupByProperty('chineseYear', postsInExtendedTags.value),
}
console.warn('postsToShow', postsToShow)

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
      :posts="postsToShow"
      :show-excerpt-toggle="true"
      :show-title="true"
      :date-formatter="(date: Date) => {
        return new Date(date).toLocaleDateString('zh-CN', {
          month: 'long',
          day: 'numeric',
        })
      }"
    >
      <template
        v-if="Object.keys(postsToShow['在此']).length === 0"
        #empty-message-addons-在此
      >
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
      <template
        v-if="Object.keys(postsToShow['更深处']).length === 0"
        #empty-message-addons-更深处
      >
        <div
          un-text="2xl neutral-800 dark:neutral-200"
          un-my-10
          un-flex="~ row"
          un-justify-center
        >
          更深处没有任何文章
        </div>
      </template>
    </PostListSection>
  </ClientOnly>
</template>
