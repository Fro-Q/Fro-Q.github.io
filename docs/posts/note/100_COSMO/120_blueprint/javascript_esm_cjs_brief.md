---
created: 2025-04-12 07:53
last_modified: 2025-04-13 10:00
aliases:
  - JavaScript 的 ESM 和 CJS
hierarchy: 120
types:
  - note
---

# [title:: JavaScript 的 ESM 和 CJS]

两种模块系统，即 ECMAScript Modules 和 CommonJS。

- **区别感知**：导入和导出方式区别

```js frame=none /export/ /exports/ /import/ /require/
// ESM

// @filename: a.js
const some = "ESM"
export { some };

// @filename: b.js
import { some } from "./a.js"

// CJS

// @filename: a.js
const another = "CJS"
module.exports = another

// @filename: b.js
const a = require("./a.js")
```

- [ ] CJS 是**同步**的，ESM 是**异步**的（同步和异步机制？） #TODO
    - `require()` 在 Node.js 中引发主线程阻塞直至模块加载完成
    - `import()` 在浏览器中触发异步网络请求，<u>不影响 DOM 构建</u>（DOM 的生命周期） #TODO
- [ ] ESM 为「**静态拓扑依赖**（AST 预解析）」 #TODO 
- [x] 先有 CJS，再有 ESM，则 JavaScript 模块系统发展历史及二者关系 [JavaScript 模块发展历史](../130_phenomenon/132_historical/javascript_module_history.md)
- [ ] 循环引用问题 #TODO 
- [ ] 显式声明 `type: "module"` 或 `.mjs`，不强制统一的原因 #TODO 
- [ ] ESM 绑定传递机制（非对象引用） #TOOD
