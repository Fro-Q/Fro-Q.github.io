<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { renderMdInline } from '../../utils/renderMdInline'

import { usePostFilters } from '../../utils/usePostFilters'

import PostMetaInfo from './PostMetaInfo.vue'
import PostNavigation from './PostNavigation.vue'

const { frontmatter } = useData()
const { findPostByTitle, getNextPost, getPrevPost, filterPostsByFrontmatter } = usePostFilters()

/**
 * Computed property to find the current post based on its title from frontmatter.
 * @returns The current post object or null if not found.
 */
const post = computed(() => {
  // const foundPost = findPostByTitle(frontmatter.value.title)
  const foundPost = findPostByTitle(frontmatter.value.title)
  return foundPost
})

/**
 * Computed property to generate meta strings for display, such as creation date and reading time.
 * @returns An array of strings containing post metadata.
 */
const metaStrings = computed(() => {
  if (!post.value) {
    return []
  }
  const strings = [
    new Date(post.value.created).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    `约${post.value.readingTime}分钟`,
  ]
  return strings
})

/**
 * Computed property to create a pool of related posts for navigation.
 * Posts are filtered by the same category and optionally by the same series.
 * @returns An array of related post objects.
 */
const postPool = computed(() => {
  if (!post.value)
    return []
  let filteredPosts = filterPostsByFrontmatter('category', post.value.frontmatter.category)
  if (post.value.frontmatter.series) {
    filteredPosts = filteredPosts.filter(p => p.frontmatter.series === post.value!.frontmatter.series)
  }
  return filteredPosts
})

/**
 * Computed property to determine the next post in the navigation pool.
 * @returns The next post object or null if there is no next post.
 */
const nextPost = computed(() => {
  if (!post.value)
    return null
  return getNextPost(post.value, postPool.value)
})

/**
 * Computed property to determine the previous post in the navigation pool.
 * @returns The previous post object or null if there is no previous post.
 */
const prevPost = computed(() => {
  if (!post.value)
    return null
  return getPrevPost(post.value, postPool.value)
})
</script>

<template>
  <un-page-content>
    <div

      un-text="5xl/relaxed"
      un-max-w-full
      un-my-10
      class="markdown-rendered text-2xl"
      v-html="post?.frontmatter.title ? renderMdInline(post.frontmatter.title) : ''"
    />
    <!-- Display post meta information (e.g., date, reading time) -->
    <PostMetaInfo :meta-strings="metaStrings" />
    <!-- Main content slot for the post -->

    <Content
      id="content"
      data-allow-mismatch
      :class="frontmatter.unstyled ? 'unstyled' : ''"
    />

    <!-- Post navigation links (previous and next post) -->
    <ClientOnly>
      <PostNavigation
        :prev-post="prevPost"
        :next-post="nextPost"
      />
    </ClientOnly>
  </un-page-content>
</template>
