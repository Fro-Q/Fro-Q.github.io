---
title: 'Header with `inline code` and $\LaTeX$'
created: 2025-04-14
last_modified: 2025-04-14
category: 共读
tags:
  - 标签1
  - 标签2
  - 标签3
---

This is a excerpt.

---

[[toc]]

## Header 2 (==mark==, **strong**, _em_)

### Header 3 (<u>underline</u>, ~~strikethrough~~)

#### Header 4 (`inline code`, $\LaTeX$)

##### Header 5

###### Header 6

---

### Paragraph

This is a paragraph, which contains **strong**, _em_, ==mark==(optional), <u>underline</u>, ~~strikethrough~~, `inline code`, $\LaTeX$, [internal `link`](api-examples.md), [external link](https://example.com) and pure link <https://example.com> element.

### Code Block

```python
msg: str = 'code block'
print(f'This is a {str}.')
print(f'This is a {str} with EEEEEEEEEEXXXXXXXXXXTTTTTTTTTTRRRRRRRRRRAAAAAAAAAA length!')
```

```JavaScript
console.log("Hell no, world!")
```

```html
This is an <a href="https://example.com">a.</a>
```

### Quote Block, Custom Containers and Alerts

> This is a quote block with a test paragraph.
>
> This is a paragraph, which contains **strong**, _em_, ==mark==(optional), <u>underline</u>, ~~strikethrough~~, `inline code`, $\LaTeX$, [internal link](api-examples.md), [external link](https://example.com) and pure link <https://example.com> element.
>
> > And this is a nested quote.

> [!note]
> Note callout.
>
> > [!warning]
> > Nested callout.
> >
> > ```python
> > print()
> > ```
>
> > [!tip]
> > Nested callout.
> >
> > > [!warning]
> > > Nested callout.
> > >
> > > ```python
> > > a: int = 3
> > > ```

> [!important]
> Info callout.
>
> > [!important]
> > Nested Important callout.

> [!note]
> Note callout.

> [!tip]
> Tip callout.

> [!warning]
> Warning callout.

> [!caution]
> Cation callout.
>
> > [!warning]
> > And a nested one.

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning with a warning block nested inside.

::: warning
This is a warning.
:::

::: details
This is a details block...

...with something nested.

::: danger
This is a dangerous warning.
:::

### Ordered List and Unordered List

1. This is an ordered list.
   1. With a sub-ordered list.
   - And an unordered list.
     - With a sub-unordered list.
2. End here.

### Table

| name  |             description              |
| :---: | :----------------------------------: |
| table | This is a table.<br>Multi-line cell. |
|  row  |             Another row.             |
| style |  _And_ **some** `other` ==style==.   |

### Mark, Footnotes and Hashtags

This is a paragraph with ==mark==, footnote[^1], and #hashtag.

![[Innei: Shiki 性能优化 - 按需加载语法解析](https://innei.in/posts/dev-story/shiki-dynamic-load-language)](https://innei.in/_next/image?url=https%3A%2F%2Fobject.innei.in%2Fbed%2F2024%2F0420_1713622248563.png&w=3840&q=75)

[你好](/)

```ts:line-numbers twoslash
console.log('1')  // [!code highlight]
console.log('2')  // [!code ++]
console.log('3')  // [!code --]
console.log('4')  // [!code error]
console.log('5')  // [!code warning]
console.log('6')
console.log('7')
console.log('8')
console.log('9')
console.log('10')
console.log('11')
console.log('12')
```

```ts:line-numbers twoslash
console.log('1')  // [!code focus]
console.log('2')
console.log('3')
```

::: code-group

```ts [./test.ts]
const a: number = 1
```

```js [1]
const b = 2
```

:::

[^1]: Content of a footnote.
