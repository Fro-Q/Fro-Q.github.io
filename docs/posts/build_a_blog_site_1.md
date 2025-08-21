---
title: "从零开始搭建博客网站（一）"
timestampId: 250109a
category: 共读
head:
  - - meta
    - name: description
      content: 从零开始搭建博客网站（一）：预备知识与安装
  - - meta
    - name: keywords
      content: 博客网站 个人网站 博客 vitepress vue vite tailwindcss github_pages typescript
  - - meta
    - name: id
      content: 250109a
created: 2025-01-09 10:34
last_modified: 2025-01-18 18:59
---

从零开始搭建博客网站（一）：预备知识与安装

---

[[toc]]

## 引

没有啥好引的，看我详细操作。

## 预备知识

### 选择们

做一个博客网站的选择有很多。

如果你只是想简简单单写点东西，直接去现成的博客平台是最方便的方法，
譬如国内的 [CSDN](https://www.csdn.net/)、
[博客园](https://www.cnblogs.com/)、
[掘金](https://juejin.cn/) 等，
以及国外的 [Medium](https://medium.com/)、
[Tumblr](https://www.tumblr.com/) 等。
这种方式的不足之处在于定制性有限，
对于想整花活的人可能不太过瘾。

你也可以基于博客框架建站，在一定程度上兼顾个性化和易用性。
可以选择低代码平台，如 [WordPress](https://wordpress.org/)。
WordPress 几乎是全球最流行的 CMS，有着丰富的插件和主题，
可以满足大部分人的大部分需求。

如果你追求极致的 DIY，建议选择自己搭建静态站点。
这样可以（几乎）完全控制网站的内容和样式，但是需要一定的编程基础。
代表性的静态站点生成工具有 [VitePress](https://vitepress.dev/)、
[Hugo](https://gohugo.io/)、
[Jekyll](https://jekyllrb.com/) 等。

如果使用静态站点生成工具，则需要把生成的静态文件部署到服务器上。
[GitHub Pages](https://pages.github.com/) 提供了免费的静态站点托管服务，
可以直接将静态文件推送到 GitHub 仓库，然后通过 GitHub Pages 服务访问。

### 本站

本站使用的是 VitePress——
一个基于 [Vue 3](https://vuejs.org/) 和 [Vite](https://vitejs.dev/) 的
静态站点生成器，
使用 [UnoCSS](https://unocss.dev/) 进行样式设计，
并托管在 GitHub Pages 上。

正文中，统一使用 TypeScript 行文。
如果您想用 JavaScript，我相信你能搞定。

::: warning
由于本站开发使用 macOS 系统，
本文中的操作可能会有一些与 Windows 以及 Linux 系统不同的地方。
:::

### 你应该知道的

要达成这个系列的基本目标，你需要对以下技术有一定的了解。

- [Markdown](https://www.markdownguide.org/)
- [git](https://git-scm.com/) 和 [GitHub](https://www.github.com/)
- [Vue.js](https://vuejs.org/)
- [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [UnoCSS](https://unocss.dev/)
- [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

你也会在这个过程中学到关于它们的更多知识。

## 安装和初始化

### 安装 Node.js

VitePress 基于 18+ 版本的 [Node.js](https://nodejs.org/)，
你可以在 [Node.js 官网](https://nodejs.org/) 下载安装包进行安装，
也可以使用包管理器进行安装。

如果使用 nvm 管理 Node.js 版本，可以使用以下命令安装 Node.js：

```zsh
nvm install 22
```

如果需要使用 pnpm 或 yarn 作为包管理器，可以用以下命令安装它们并启用：

```zsh
corepack enable pnpm
# corepack enable yarn
```

以下操作均以 pnpm 为例。

### 初始化 git 仓库

首先，你应该了解 git 的基本操作。
可以参考 [git 官方文档](https://git-scm.com/book/zh/v2) 来学习。

在本系列文章中，我们使用 GitHub Pages 来托管静态文件，
故需要将静态文件推送到 GitHub 仓库。

首先，
可以在 GitHub 上创建一个新的仓库——姑且命名为 `typescript_example_site`。
然后将其克隆到本地。
这将作为博客网站的根目录。

```zsh
git clone https://github.com/Fro-Q/typescript_example_site.git
```

不知道有没有必要提醒一下，
请注意不要复制上面的命令，那是我的仓库 :sweat_smile: 。

### 安装 VitePress 与初始化

定位到根目录，然后使用运行 VitePress 的初始化命令：

```zsh
npx vitepress init
```

VitePress 官网提供了详细的安装与初始化配置说明，
可以参考 [这里](https://vitepress.dev/guide/getting-started#installation)。

在进行 setup 的时候，
需要选择主题为 Default Theme / Default Theme + Customization / Custom Theme。
如果仅仅是想快速搭建一个博客网站，可以选择 Default Theme，然后再见。
如果想要更高程度的自定义，可以选择 Custom Theme。
本站的样式几乎是完全自定义的。
选择 Custom Theme，你可以了解到更多关于 VitePress 配置和 Vue 开发的内容。

setup 时还需要设置一些基本信息：

```
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  Example Site
│
◇  Site description:
│  A VitePress Site.
│
◇  Theme:
│  Custom Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.
```

虽然可以在后续进行修改，
但还是建议在 setup 阶段填写正确的信息以省去不必要的麻烦。
（除了 Initail directory、 Site title 和 Site description
因为这仨真的很好改 :innocent: ）

以上操作将会生成这样的文件树：

```tree
.
├── docs
│   ├── .vitepress
│   │   ├── config.mts
│   │   └── theme
│   │       ├── Layout.vue
│   │       ├── index.ts
│   │       └── style.css
│   ├── api-examples.md
│   ├── index.md
│   └── markdown-examples.md
└── package.json
```

其中 `docs` 目录是在 setup 阶段配置的 VitePress 初始化目录，
其中包含了文章的 Markdown 文件，
以及 VitePress 的配置文件夹 `.vitepress/`。

此外，由于选择了 Custom Theme，则需要显式安装 Vue 3：

```zsh
pnpm install vue@latest
```

### Linter

本项目使用 [ESLint](https://eslint.org/) 作为 linter（以及 formatter），
使用 [@antfu/eslint-config](https://github.com/antfu/eslint-config)
来配置 ESLint，具体的配置方式请访问该仓库。

### 安装 UnoCSS

UnoCSS 是一个非常优雅的原子化 CSS 方案，好用爱用。

使用 pnpm 安装 UnoCSS:

```zsh
pnpm install -D unocss
```

然后在项目目录下新建 `uno.config.mts` 配置文件：

```ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTagify,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|css)($|\?)/,
      ],
    },
  },
  shortcuts: {},
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json', { with: { type: 'json' } }).then(i => i.default as any),
        ph: () => import('@iconify-json/ph/icons.json', { with: { type: 'json' } }).then(i => i.default as any),
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
    transformerVariantGroup(),
  ],
  layers: {
    default: 0,
    components: 1,
    utilities: 2,
  },
})
```

先别急，后续会详细解释。
现在去 `index.ts` 和 `config.mts` 里面写一下这些东西：

::: code-group

```ts [./docs/.vitepress/theme/index.ts]
import type { Theme } from 'vitepress'
// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import '@unocss/reset/tailwind.css' // [!code ++:3]
import './style.css'
import 'uno.css'

export default {
  Layout,
  enhanceApp() {
    // ...
  },
} satisfies Theme
```

```ts [./docs/.vitepress/config.mts]
import unocss from 'unocss/vite' // [!code ++]
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Example Site',
  description: 'A VitePress Site.',
  vite: {
    // [!code ++:4]
    plugins: [
      unocss(),
    ],
  },
})
```

:::

如果你跟我一样使用 `@antfu/eslint-config` 来配置 ESLint，
而且希望 ESLint 处理 UnoCSS 的类名排序，
记得添加 `"unocss": true` 到 `eslint.config.mjs` 中。
（参考 [这个](https://github.com/antfu/eslint-config?tab=readme-ov-file#unocss)）

## 讲一下 Uno

### `preset` 们

UnoCSS 其实只是一个 CSS 引擎，
它本身其实并不提供任何的样式。
我们需要自行配置 `rules`——即类名 -> CSS 的映射，
或者使用官方以及社区提供的预设 `preset`。

这里使用了四个预设：
`presetAttributify`、`presetIcons`、`presetMini` 和 `presetTagify`。

#### `presetMini`

这是 UnoCSS 的基本预设，
可以认为是 Tailwind CSS 提供的 CSS 工具类的子集，
不过排除了
"_[opinioned or complicated utilities](https://unocss.dev/presets/mini#rules)_"。
它将作为我们构建自定义预设的基础。

#### `presetAttributify`

这个预设允许我们将类名写为 HTML 属性。
套用[官方的例子](https://unocss.dev/presets/attributify#attributify-mode)：

```html
<!-- 对于 -->
<button
  class="rounded border-2 border-blue-200 bg-blue-400 px-4 py-2 font-mono text-sm font-light text-white hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
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
<button class="border-red border">Button</button>

<!-- 可以写成 -->
<button border="~ red">Button</button>

<!-- valueless attributify -->
<!-- 对于 -->
<div class="m-2 rounded text-teal-400" />

<!-- 可以写成 -->
<div m-2 rounded text-teal-400 />
```

妈妈再也不用担心我一行写 800 个类名了~

不过由于部分类名会和 HTML 原生属性冲突，比如 `text`，
所以这里配置了 `prefixedOnly: true, prefix: 'un-',`
以使用 `un-` 前缀将样式类和 HTML 的 `text` 属性区分开来。
你也可以自己配置 `prefix: 'xxx-'` 为自己喜欢的前缀。

#### `presetTagify`

这个预设允许直接将样式类写为 HTML 标签，
前提是只能有一个样式类。套用官方的例子：

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

这是一个使用纯 CSS 来渲染 icon 的预设
（推一下 [这篇文](https://antfu.me/posts/icons-in-pure-css)），
支持 [Iconify](https://iconify.design/) 的所有 icon 集。
这里目前配置了
[`carbon`](https://v10.carbondesignsystem.com/guidelines/icons/library/) 和
[`ph`](https://phosphoricons.com/) 两个集，
你可以根据自己的需求添加更多。

记得要安装 `@iconify-json/...`，
如对于 `carbon` 这个集合，
需要安装 `@iconify-json/carbon`。

使用方法在后续的文章中会涉及到。

### ~~变形金刚~~ `transformer` 们

#### `transformerDirectives`

由于我们仍然需要写 CSS 来实现文章内部的样式，
所以这里配置了 `transformerDirectives`。
这个 `transformer` 允许我们在 CSS 中使用指令，
比如 `@apply`、`@screen` 等。
同时，为了兼容纯 CSS，
可以使用 CSS 变量 `--at-apply`、`--uno-apply` 或 `--uno` 来代替 `@apply`。

#### `transformerVariantGroup`

这个 `transformer` 允许我们在 CSS 中使用变体组。
即对于同一变体（`hover`、`dark` 等）的不同样式，
可以使用某种更简洁的写法。套用官方的例子：

```html
<!-- 对于 -->
<div class="hover:bg-gray-400 hover:font-medium font-light font-mono" \>
  <!-- 可以写成 -->
  <div class="hover:(bg-gray-400 font-medium) font-(light mono)" \></div>
</div>
```

### `layers`

配置了一下样式的层级顺序。
我姑且认为两个层级足够了，
如果你有更多的需求，
可以自行添加。

在写类名的时候可以通过 `uno-layer-<name>:` 来指定层级，
未显式指定层级的类名会被放到 `default` 层级中。

## 结

到这里，关键的准备工作已经完成。
