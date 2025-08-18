---
created: 2025-04-13 08:13
last_modified: 2025-04-13 10:01
aliases:
  - JavaScript 模块发展历史
hierarchy: 132
types:
  - note
---

# [title:: JavaScript 模块发展历史]

1. ES6 发布之前，没有模块概念，只有全局作用域和函数作用域，导致命名冲突和屎山代码，而且难以复用；
2. 开发应用的规模增大，2009 年由 Kevin Dangoor 提出适用于浏览器外 JavaScript 的标准模块系统 **CommonJS**；
    1. 被 Node.js 采用，成为 server-side 的默认模块系统；
    2. 同步加载，在基于浏览器的应用程序中效率低下；
    3. 原生不支持浏览器环境；
    4. [ ] 没有静态分析，没有 tree shaking； #TODO 
3. ES6 发布（[ECMAScript 版本关键历史](ecmascript_version_key_history.md)），ESM 成为新标准，旨在同时适用于浏览器和服务器；
    1. [ ] 异步； #TODO 
    2. 允许静态分析，实现 tree shaking；
    3. 支持顶层模块 `await`；

所有目前主流有两种模块系统，且似乎 ESM 是未来之选。
