---
title: "从零开始搭建博客网站 · 番外（一）"
timestampId: 250306a
category: 共读
head:
  - - meta
    - name: description
      content: 从零开始搭建博客网站 · 番外（一）：一点点改动。
  - - meta
    - name: keywords
      content: 博客网站 个人网站 博客 vitepress vue vite tailwindcss github_pages typescript
  - - meta
    - name: id
      content: 250306a
created: 2025-03-06 07:34
last_modified:
---

从零开始搭建博客网站 · 番外（一）：一点点改动。

---

[[toc]]

## ごめん 

向大家道个歉。在之前的文章（[这里](build_a_blog_site_1#安装-nodejs)、[这里](build_a_blog_site_1#安装-tailwind-css) 和 [这里](build_a_blog_site_2#格式化)）中，我们使用的包管理工具、CSS 设计工具以及代码格式化工具分别是 NPM、Tailwind CSS 和 Prettier。不过由于一些担忧，以后的文章中将统一改为 PNPM、UnoCSS 和 ESLint。对于 PNPM 和 ESLint 的改变，您可以什么都不做；不过使用 UnoCSS 可能会对之前设计的样式造成一些影响，所以请做好需要修改代码的准备，但无论如何我会尽量避免 breaking changes。

后续将使用 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 来配置 ESLint，具体的配置方式请访问该仓库。

下面给出 UnoCSS 的基本配置方式。

## UnoCSS 的基本配置

首先删除 `tailwind.config.js` 和 `postcss.config.js` 文件，然后在项目根目录下创建 `uno.config.js` 文件：

```js
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTagify,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
    presetAttributify({
      strict: true,
      prefixedOnly: true,
      prefix: 'un-',
    }),
    presetTagify({
      prefix: 'un-',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  layers: {
    default: 0,
    components: 1,
    utilities: 2,
  },
})
```

先别急，后续会详细解释。然后在 `index.ts` 和 `config.mts` 中进行以下配置：

::: code-group

```ts [./docs/.vitepress/theme/index.ts]
import type { Theme } from 'vitepress'
// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import '@unocss/reset/tailwind.css'
import './style.scss'
import 'uno.css'  // [!code ++]

export default {
  Layout,
  enhanceApp() {
    // ...
  },
} satisfies Theme
```

```ts [./docs/.vitepress/config.mts]
import unocss from 'unocss/vite'  // [!code ++]
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Example Site',
  description: 'A VitePress Site.',
  vite: {  // [!code ++:4]
    plugins: [
      unocss(),
    ],
  },
})
```

:::

现在可以删掉 `style.css` 中的 `@tailwind` 相关代码了。

此外，如果你跟我一样使用 `@antfu/eslint-config` 来配置 ESLint，而且希望 ESLint 处理 UnoCSS 的类名排序，记得添加 `"unocss": true` 到 `eslint.config.mjs` 中。（参考 [这个](https://github.com/antfu/eslint-config?tab=readme-ov-file#unocss)）

## 讲一下

### `preset` 们

UnoCSS 其实只是一个 CSS 引擎，它本身其实并不提供任何的样式。我们需要自行配置 `rules`——即类名 -> CSS 的映射，或者使用官方以及社区提供的预设 `preset`。

这里使用了四个预设：`presetAttributify`、`presetIcons`、`presetMini` 和 `presetTagify`。

#### `presetMini`

这是 UnoCSS 的基本预设，可以认为是 Tailwind CSS 提供的 CSS 工具类的子集，排除了 "*[opinioned or complicated utilities](https://unocss.dev/presets/mini#rules)*"。它将作为我们构建自定义预设的基础。

#### `presetAttributify`

这个预设允许我们将类名写为 HTML 属性。套用[官方的例子](https://unocss.dev/presets/attributify#attributify-mode)：

```html
<!-- 对于 -->
<button
  class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Button
</button>

<!-- 可以写成 -->
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>


<!-- self-referencing -->
<!-- 对于 -->
<button class="border border-red">Button</button>

<!-- 可以写成 -->
<button border="~ red">Button</button>

<!-- valueless attributify -->
<!-- 对于 -->
<div class="m-2 rounded text-teal-400" />

<!-- 可以写成 -->
<div m-2 rounded text-teal-400 />
```

妈妈再也不用担心我一行写 800 个类名了~

不过由于部分类名会和 HTML 属性冲突，所以这里配置了 `prefixedOnly: true, prefix: 'un-', 以使用 `un-` 前缀将样式类和 HTML 的 `text` 属性区分开来。你也可以自己配置 `prefix: 'xxx-'` 为自己喜欢的前缀。

#### `presetTagify`

这个预设允许直接将样式类写为 HTML 标签，前提是只能有一个样式类。套用官方的例子：

```html
<!-- 对于 -->
<span class="text-red"> red text </span>
<div class="flex">flexbox</div>
I'm feeling <span class="i-line-md-emoji-grin"></span> today!

<!-- 可以写成 -->
<text-red> red text </text-red>
<flex> flexbox </flex>
I'm feeling <i-line-md-emoji-grin /> today!
```

同样地，配置了 `prefix: 'un-' 以统一前缀。

#### `presetIcons`

这是一个使用纯 CSS 来渲染 icon 的预设，支持 [Iconify](https://iconify.design/) 的所有 icon 集。这里目前只配置了 [`carbon`](https://v10.carbondesignsystem.com/guidelines/icons/library/) 一个集合，你可以根据自己的需求添加更多的集合。

记得要安装 `@iconify-json/...` 如对于 `carbon` 这个集合，需要安装 `@iconify-json/carbon`。

使用方法在后续的文章中会涉及到。

### `transformerDirectives`

由于我们仍然需要写 CSS 来实现文章内部的样式，所以这里配置了 `transformerDirectives`。这个 `transformer` 允许我们在 CSS 中使用指令，比如 `@apply`、`@screen` 等。同时，为了兼容纯 CSS，可以使用 CSS 变量 `--at-apply`、`--uno-apply` 或 `--uno` 来代替 `@apply`。

### `layers`

配置了一下样式的层级顺序。我姑且认为两个层级足够了，如果你有更多的需求，可以自行添加。

在写类名的时候可以通过 `uno-layer-<name>:` 来指定层级，未显式指定层级的类名会被放到 `default` 层级中。

## 示范一下

结合之前的 `prefix`，举个栗子，我们之前的 `pageContentHome.vue` 可以写为：

```vue
<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from '../src/posts.data'

const { site } = useData()
</script>

<template>
  <div
    un-mx-auto
    un-max-w="[700px]"
  >
    <h1
      un-m-4
      un-text="center 4xl"
    >
      {{ site.title }}
    </h1>
    <div
      un-m-4
      un-min-h="[200px]"
      un-text-center
    >
      <p>{{ site.description }}</p>
    </div>
    <div>
      <div
        v-for="post in posts"
        :key="post.url"
        un-text="neutral-600 dark:neutral-400 hover:neutral-900 dark:hover:neutral-100"
        un-py-2
        un-transition-colors
        un-duration-200
      >
        <a
          un-text-2xl
          :href="post.url"
        >{{ post.frontmatter.title }}</a>
      </div>
    </div>
  </div>
</template>
```

注意到，我们应该会经常使用 `mx-auto max-w="[700px]"` 这个类名，它实现了居中和可读性较高的宽度。我们可以把这个玩意提出出来写成 `shortcuts`：


::: code-group

```js [uno.config.js]
import {
  // ...
} from 'unocss'

export default defineConfig({
  shortcuts: {  // [!code ++:3]
    'page-content': 'mx-auto max-w-[700px]',
  },
  // ...
})
```

```vue [pageContentHome.vue]
<template>
  <div un-page-content>  <!-- [!code ++:1] -->
    <!-- ... -->
  </div>
</template>
```

:::

除此之外，为了不让 Vue 的编译器报错，我们还需要在 `config.mts` 中设置一下 `compilerOptions`：

```ts
import unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Example Site',
  description: 'A VitePress Site.',
  vite: {
    plugins: [
      unocss(),
    ],
  },
  vue: {  // [!code ++:7]
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('un-'),  // [!code focus]
      },
    },
  },
})
```