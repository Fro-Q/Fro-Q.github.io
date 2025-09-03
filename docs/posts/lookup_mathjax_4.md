---
title: '询 · MathJax / $\LaTeX$ 公式（四）'
category: 共讀
series: mathjax_symbol
head:
  - - meta
    - name: description
      content: 询 · MathJax / $\LaTeX$ 公式（四）：log 类，
  - - meta
    - name: keywords
      content: mathjax latex log_like log类
created: 2025-01-05 13:27
last_modified: 2025-05-27 21:23
---

询 · MathJax / $\LaTeX$ 公式（四）：log 类，字母修饰。

---

[[toc]]

## `log` 类｜Log-like

| 渲染                                             | 输入                                             |
| ------------------------------------------------ | ------------------------------------------------ |
| $\sin$, $\cos$, $\tan$, $\cot$, $\csc$, $\sec$   | `\sin`, `\cos`, `\tan`, `\cot`, `\csc`, `\sec`   |
| $\arcsin$, $\arccos$, $\arctan$                  | `\arcsin`, `\arccos`, `\arctan`                  |
| $\sinh$, $\cosh$, $\tanh$, $\coth$               | `\sinh`, `\cosh`, `\tanh`, `\coth`               |
| $\arg$                                           | `\arg`                                           |
| $\gcd$                                           | `\gcd`                                           |
| $\deg$                                           | `\deg`                                           |
| $\det$                                           | `\det`                                           |
| $\dim$                                           | `\dim`                                           |
| $\exp$                                           | `\exp`                                           |
| $\hom$                                           | `\hom`                                           |
| $\lim$                                           | `\lim`                                           |
| $\inf$, $\sup$                                   | `\inf`, `\sup`                                   |
| $\liminf$, $\limsup$, $\varliminf$, $\varlimsup$ | `\liminf`, `\limsup`, `\varliminf`, `\varlimsup` |
| $\ker$                                           | `\ker`                                           |
| $\ln$, $\log$, $\lg$                             | `\ln`, `\log`, `\lg`                             |
| $\max$, $\min$                                   | `\max`, `\min`                                   |

部分符号的含义如下：

- $\arg$：argument：
  - 复数的辐角；
  - 极值点，如 $\underset {x \in S} {\arg \max} \,f(x)$ 表示 $f(x)$ 在 $S$ 上的极大值点或点集；
- $\gcd$：greatest common divisor，最大公约数；
- $\deg$：degree，通常指 degree of a polynomial，即多项式的次数；
- $\det$：determinant，（矩阵的）行列式；
- $\dim$，dimension，（向量空间或线性空间等的）维数；
- $\exp$：exponential function，指数函数；
- （不确定）$\hom$：homomorphism，同态；
- $\inf$ / $\sup$：inferior / superior，下确界与上确界；
- $\liminf$, $\varliminf$：序列的下极限；
- $\limsup$, $\varlimsup$：序列的上极限；
- $\ker$：kernel，矩阵的核；

## 字母修饰｜Accents

| 渲染                                                                       | 输入                                                                       |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| $\dot{a}$, $\ddot{a}$, $\dddot{a}$, $\ddddot{a}$                           | `\dot{a}`, `\ddot{a}`, `\dddot{a}`, `\ddddot{a}`                           |
| $\vec{a}$                                                                  | `\vec{a}`                                                                  |
| $\bar{a}$                                                                  | `\bar{a}`                                                                  |
| $\acute{a}$, $\grave{a}$, $\hat{a}$, $\breve{a}$, $\check{a}$, $\tilde{a}$ | `\acute{a}`, `\grave{a}`, `\hat{a}`, `\breve{a}`, `\check{a}`, `\tilde{a}` |
| $\overrightarrow{abc}$, $\overleftarrow{abc}$                              | `\overrightarrow{abc}`, `\overleftarrow{abc}`                              |
| $\underrightarrow{abc}$, $\underleftarrow{abc}$                            | `\underrightarrow{abc}`, `\underleftarrow{abc}`                            |
| $\overleftrightarrow{abc}$, $\underleftrightarrow{abc}$                    | `\overleftrightarrow{abc}`, `\underleftrightarrow{abc}`                    |
| $\overline{abc}$, $\underline{abc}$                                        | `\overline{abc}`, `\underline{abc}`                                        |
| $\overbrace{abc}$, $\underbrace{abc}$                                      | `\overbrace{abc}`, `\underbrace{abc}`                                      |
| $\overbracket{abc}$, $\underbracket{abc}$                                  | `\overbracket{abc}`, `\underbracket{abc}`                                  |
| $\sqrt{abc}$                                                               | `\sqrt{abc}`                                                               |
| $\widetilde{abc}$, $\widehat{abc}$                                         | `\widetilde{abc}`, `\widehat{abc}`                                         |
| $\xleftarrow{abc}$, $\xrightarrow{abc}$                                    | `\xleftarrow{abc}`, `\xrightarrow{abc}`                                    |
| $\xLeftarrow{abc}$, $\xRightarrow{abc}$                                    | `\xLeftarrow{abc}`, `\xRightarrow{abc}`                                    |
| $\xleftrightarrow{abc}$, $\xLeftrightarrow{abc}$                           | `\xleftrightarrow{abc}`, `\xLeftrightarrow{abc}`                           |
| $\xlongequal{abc}$                                                         | `\xlongequal{abc}`                                                         |
