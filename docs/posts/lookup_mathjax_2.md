---
title: '询 · MathJax \ LaTeX 公式（二）'
timestampId: 241231a
category: 共读
head:
  - - meta
    - name: description
      content: 询 · MathJax \ LaTeX 公式（二）：二元运算符，可变尺寸运算符。
  - - meta
    - name: keywords
      content: mathjax latex binary_operator variable_sized_operator 二元运算符 可变尺寸运算符
  - - meta
    - name: id
      content: 241231a
created: 2024-12-31 22:17
last_modified: 2025-01-01 20:37
---

询 · MathJax \ LaTeX 公式（二）：二元运算符，可变尺寸运算符。

---

[[toc]]

## 二元运算符｜Binary Operators

| 渲染                                                          | 输入                                                          |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| $+$, $-$, $\times$, $\div$, $\cdot$, $\setminus$, $\circ$   | `+`, `-`, `\times`, `\div`, `\cdot`, `\setminus`, `\circ`   |
| $\oplus$, $\ominus$, $\otimes$, $\oslash$, $\odot$          | `\oplus`, `\ominus`, `\otimes`, `\oslash`, `\odot`          |
| $\pm$, $\mp$, $\divideontimes$                              | `\pm`, `\mp`, `\divideontimes`                              |
| $\ast$, $\star$, $\bullet$                                  | `\ast`, `\star`, `\bullet`                                  |
| $\cap$, $\cup$, $\sqcap$, $\sqcup$, $\wedge$, $\vee$        | `\cap`, `\cup`, `\sqcap`, `\sqcup`, `\wedge`, `\vee`        |
| $\Cap$, $\Cup$                                              | `\Cap`, `\Cup`                                              |
| $\ltimes$, $\rtimes$, $\leftthreetimes$, $\rightthreetimes$ | `\ltimes`, `\rtimes`, `\leftthreetimes`, `\rightthreetimes` |

## 可变尺寸运算符｜Variable-sized Operators

| 渲染                                                        | 输入                                                        |
| --------------------------------------------------------- | --------------------------------------------------------- |
| $\bigcap$, $\bigcup$, $\bigsqcup$, $\bigwedge$, $\bigvee$ | `\bigcap`, `\bigcup`, `\bigsqcup`, `\bigwedge`, `\bigvee` |
| $\prod$, $\coprod$                                        | `\prod`, `\coprod`                                        |
| $\sum$                                                    | `\sum`                                                    |
| $\int f(x) \, \mathrm d x$                                | `\int f(x) \, \mathrm d x`                                |
| $\oint f(x) \, \mathrm d x$                               | `\oint f(x) \, \mathrm d x`                               |
| $\iint f(\mathbf x) \, \mathrm d \mathbf x$               | `\iint f(\mathbf x) \, \mathrm d \mathbf x`               |
| $\iiint f(\mathbf x) \, \mathrm d \mathbf x$              | `\iiint f(\mathbf x) \, \mathrm d \mathbf x`              |
| $\iiiint f(\mathbf x) \, \mathrm d \mathbf x$             | `\iiiint f(\mathbf x) \, \mathrm d \mathbf x`             |
| $\idotsint f(\mathbf x) \, \mathrm d \mathbf x$           | `\idotsint f(\mathbf x) \, \mathrm d \mathbf x`           |

对于可带上下极限的符号，如前三行列出的前 8 个符号，若设置了 display style 或使用由 `$$ $$` 包裹的数学公式段落，则其极限上下标将显示在符号的上方和下方，如 $\displaystyle \sum_{i=1}^{\infty} A_i$；否则将显示在符号右侧，如 $\sum_{i=1}^{\infty} A_i$。

关于极限上下标位置的更多讨论，请阅读 [MathJax 中的上下标位置](mathjax_sup_sub_position.md)。
