---
title: Snacks.nvim 中的 Layout
category: 共讀
head:
  - - meta
    - name: description
      content: 简单讲一下因为我自己看了挺多遍。
  - - meta
    - name: keywords
      content: neovim snacks layout configuration
created: 2025-09-23 16:56
last_modified: 2025-09-23 16:56
---

简单讲一下因为我自己看了挺多遍。

[[toc]]

---

## 上下文

[Neovim](https://neovim.io/)
需要讲吗？或者过段时间直接开个 config 的坑。
[Snacks.nvim](https://github.com/folke/snacks.nvim/)
应该圈内也很出名，毕竟是 Folke 大佬的东西。

Folke 说 Snacks 是一群 QoL 小插件的集合体。
简单来讲，它基本上可以用来代替掉
telescope、dashboard、neotree、terminal
等等一堆插件。

它给了很多模块化的功能，
不过我个人认为最顶级的是它的 picker。
picker 就是一个 fuzzy finder，
类似 telescope，
可以基于不同的 sources 来做搜索。
Snacks 内置了 40 多个 source，
用不完根本用不完。

而 layout 就是 picker 的布局。
对于不同的 picker，
我们可以用不同的布局来展示它们。
举个例子，explorer 的默认 layout 是 sidebar，
则它会默认出现在左侧，就像 neotree 一样。
