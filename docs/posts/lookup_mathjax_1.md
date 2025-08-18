---
title: '询 · MathJax \ LaTeX 公式（一）'
timestampId: 241230a
category: 共读
head:
  - - meta
    - name: description
      content: 询 · MathJax \ LaTeX 公式（一）：希腊字母。
  - - meta
    - name: keywords
      content: mathjax latex greek_letter 希腊字母
  - - meta
    - name: id
      content: 241230a
created: 2024-12-30 23:42
last_modified: 2025-01-09 08:29
---

询 · MathJax \ LaTeX 公式（一）：希腊字母，希伯来字母，字母型符号。

---

[[toc]]

## 希腊字母｜Greek Letters

| 渲染                                                                                  | 输入                                                                                  |
| :------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| $\alpha$, $\upalpha$, $A$                                                             | `\alpha`, `\upalpha`,`A`                                                              |
| $\beta$, $\upbeta$, $B$                                                               | `\beta`, `\upbeta`,`B`                                                                |
| $\gamma$, $\upgamma$, $\Gamma$, $\Upgamma$(, $\varGamma$)                             | `\gamma`, `\upgamma`, `\Gamma`, `\Upgamma`(, `\varGamma`)                             |
| $\delta$, $\updelta$, $\Delta$, $\Updelta$(, $\varDelta$)                             | `\delta`, `\updelta`, `\Delta`, `\Updelta`(, `\varDelta`)                             |
| $\epsilon$, $\upepsilon$, $\varepsilon$, $\upvarepsilon$, $E$,                        | `\epsilon`, `\upepsilon`, `\varepsilon`, `\upvarepsilon`, `E`                         |
| $\zeta$, $\upzeta$, $Z$                                                               | `\zeta`, `\upzeta`, `Z`                                                               |
| $\eta$, $\upeta$, $H$                                                                 | `\eta`, `\upeta`, `H`                                                                 |
| $\theta$, $\uptheta$, $\vartheta$, $\upvartheta$, $\Theta$, $\Uptheta$(, $\varTheta$) | `\theta`, `\uptheta`, `\vartheta`, `\upvartheta`, `\Theta`, `\Uptheta`(, `\varTheta`) |
| $\iota$, $\upiota$, $I$                                                               | `\iota`, `\upiota`, `I`                                                               |
| $\kappa$, $\upkappa$, $\varkappa$, $K$                                                | `\kappa`, `\upkappa`, `\varkappa`, `K`                                                |
| $\lambda$, $\uplambda$, $\Lambda$, $\Uplambda$(, $\varLambda$)                        | `\lambda`, `\uplambda`, `\Lambda`, `\Uplambda`(, `\varLambda`)                        |
| $\mu$, $\upmu$, $M$                                                                   | `\mu`, `\upmu`, `M`                                                                   |
| $\nu$, $\upnu$, $N$                                                                   | `\nu`, `\upnu`, `N`                                                                   |
| $\xi$, $\upxi$, $\Xi$, $\Upxi$(, $\varXi$)                                            | `\xi`, `\upxi`, `\Xi`, `\Upxi`(, `\varXi`)                                            |
| $o$, $O$                                                                              | `o`, `O`                                                                              |
| $\pi$, $\uppi$, $\varpi$, $\upvarpi$, $\Pi$, $\Uppi$(, $\varPi$)                      | `\pi`, `\uppi`, `\varpi`, `\upvarpi`, `\Pi`, `\Uppi`(, `\varPi`)                      |
| $\rho$, $\uprho$, $\varrho$, $\upvarrho$, $P$                                         | `\rho`, `\uprho`, `\varrho`, `\upvarrho`, `P`                                         |
| $\sigma$, $\upsigma$, $\varsigma$, $\upvarsigma$, $\Sigma$, $\Upsigma$(, $\varSigma$) | `\sigma`, `\upsigma`, `\varsigma`, `\upvarsigma`, `\Sigma`, `\Upsigma`(, `\varSigma`) |
| $\tau$, $\uptau$, $T$                                                                 | `\tau`, `\uptau`, `T`                                                                 |
| $\upsilon$, $\upupsilon$, $\Upsilon$, $\Upupsilon$(, $\varUpsilon$)                   | `\upsilon`, `\upupsilon`, `\Upsilon`, `\Upupsilon`(, `\varUpsilon`)                   |
| $\phi$, $\upphi$, $\varphi$, $\upvarphi$, $\Phi$, $\Upphi$(, $\varPhi$)               | `\phi`, `\upphi`, `\varphi`, `\upvarphi`, `\Phi`, `\Upphi`(, `\varPhi`)               |
| $\chi$, $\upchi$, $X$                                                                 | `\chi`, `\upchi`, `X`                                                                 |
| $\psi$, $\uppsi$, $\Psi$, $\Uppsi$(, $\varPsi$)                                       | `\psi`, `\uppsi`, `\Psi`, `\Uppsi`(, `\varPsi`)                                       |
| $\omega$, $\upomega$, $\Omega$, $\Upomega$(, $\varOmega$)                             | `\omega`, `\upomega`, `\Omega`, `\Upomega`(, `\varOmega`)                             |
| $\digamma$                                                                            | `\digamma`                                                                            |

其中：`\digamma` 和 `\varkappa` 是由 [AMS-LaTeX](https://www.ams.org/arc/resources/amslatex-about.html) 包提供的符号；所有以 `up` 或 `Up` 作为代码前缀的符号是由 [upgreek](https://docs.mathjax.org/en/latest/input/tex/extensions/upgreek.html) 包提供的直立字母。

注意到部分小写字符具有 `var-` 变体，如 `\varepsilon`、`\vartheta`、`\varpi` 等。关于此现象的更多讨论，请阅读 [MathJax 中希腊字母的 `\var-` 变体](mathjax_greek_var.md)。

尽管 [*The Comprehensive $\LaTeX$ Symbol List*](https://sg.mirrors.cicku.me/ctan/info/symbols/comprehensive/symbols-a4.pdf) 中没有列出，但对于所有的大写字符，加上 `var-` 前缀即可得到其斜体变体，如表中括号内所示。

## 希伯来字母

| 渲染                           | 输入                           |
| ---------------------------- | ---------------------------- |
| $\beth$, $\gimel$, $\daleth$ | `\beth`, `\gimel`, `\daleth` |

## 字母型符号

| 渲染                                             | 输入                                             |
| ---------------------------------------------- | ---------------------------------------------- |
| $\bot$, $\top$                                 | `\bot`, `\top`                                 |
| $\ell$, $\hbar$, $\hslash$, $\imath$, $\jmath$ | `\ell`, `\hbar`, `\hslash`, `\imath`, `\jmath` |
| $\exists$, $\nexists$, $\forall$               | `\exists`, `\nexists`, `\forall`               |
| $\in$, $\ni$                                   | `\in`, `\ni` / `\owns`                         |
| $\partial$                                     | `\partial`                                     |
