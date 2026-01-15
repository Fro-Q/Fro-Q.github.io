<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { usePostFilters } from '../../utils/usePostFilters.ts'
import { data as posts } from '../src/corpus.data.ts'
import PostListSection from './PostListSection.vue'

// const { generatePostList } = usePostFilters((posts) => {
//   return posts.filter(post => post.layer === useRoute().path.split('/')[1])
// })

const route = useRoute()

let thisPosts = posts.filter((post) => {
  return post.layer === useRoute().path.split('/')[1] && !post.frontmatter.index
})

// If under "/600_exitus/" layer, group posts
if (route.path.split('/')[1] === '600_exitus') {
  const groupedPosts: Record<string, typeof posts> = {}
  thisPosts.forEach((post) => {
    const group = post.frontmatter.group || '未分组'
    if (!groupedPosts[group]) {
      groupedPosts[group] = []
    }
    groupedPosts[group].push(post)
  })
  // Flatten the grouped posts back into thisPosts
  thisPosts = Object.values(groupedPosts).flat()
}
</script>

<template>
  <section
    un-mx-auto
    un-mb-16
    un-w-full
    un-max-w-3xl
    un-px-4
    un-py-8
  >
    <PostListSection
      :id="useRoute().path.split('/')[1]"
      :show-excerpt-toggle="true"
      :posts="thisPosts"
    />
  </section>
</template>
