---
title: "从零开始搭建博客网站（十）"
category: 共读
head:
  - - meta
    - name: description
      content: 从零开始搭建博客网站（十）：404 找不见和 Contact。
  - - meta
    - name: keywords
      content: 博客网站 个人网站 博客 vitepress vue vite unocss github_pages typescript
created: 2025-08-22 09:41
last_modified: 2025-08-22 09:41
---

从零开始搭建博客网站（十）：404 找不见和 Contact。

---

[[toc]]

## 404 找不见

当访问站点中未被定义的路由时，会返回一个 404 页面。
在开发服务器中随便访问一个不存在的路由，
如 `http://localhost:5173/ok`，
看看长啥样：

![它甚至是白色的](build_a_blog_site_10_assets/ATTCH_20250822094819.png)

可以看到，尽管处于黑暗模式下，
这个页面仍然是白色的。
在开发者工具中可以看到，`#app` 这个元素中没有任何内容，
高度为 0。
这意味着在 `Layout.vue` 中没有任何内容被渲染出来。

VitePress 提供的 `useData()` 函数中提供了一个 `page` 对象,
其中有一个属性 `isNotFound`，
可以用于判断当前页面是否是 404。
我们可以基于这个属性来做一个简单的组件：

```vue [./docs/.vitepress/theme/components/PageContentNotFound.vue]
<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { data as posts } from '../src/posts.data'

const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 3)

function metaStrings(post: Data) {
  return [
    post.created.formattedString,
    `约 ${post.readingInfo.words} 字`,
    `${post.readingInfo.minutes} 分钟`,
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
        href="/contact/"
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
```
