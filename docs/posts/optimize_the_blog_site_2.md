---
title: 优化一个博客网站（二）
category: 共讀
series: blog_site
head:
  - - meta
    - name: description
      content: 优化一个博客网站（二）：文章页面的其他玩意。
  - - meta
    - name: keywords
      content: blog personal_website vue tutorial 博客 个人网站 教程
created: 2025-09-03 15:28
last_modified: 2025-09-03 15:28
---

优化一个博客网站（二）：文章页面的其他玩意。

---

[[toc]]

## 统一口径

先把头部的日期统一掉。

![统一日期格式](optimize_the_blog_site_2_assets/ATTCH_1756884999880.png)

## 上/下一篇文章

最简单的方式是把上一篇和下一篇日期最近的文章放出来，
但对于我这个博客来说，因为有「共讀」这个类别，
前后两篇文章可能属于共读里面的不同「系列」，
所以这里更合理的做法是在文章的 frontmatter
中加入可选的属性来记录这篇文章所属的系列，
并优先通过这个属性来确定同系列的上一篇和下一篇文章。
这里我用了 `series` 这个属性来做。
