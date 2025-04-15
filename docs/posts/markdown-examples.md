---
title: 'Header with `inline code` and $\LaTeX$'
category: Test
head:
  - - meta
    - name: description
      content: Description with `inline code` and $\LaTeX$.
  - - meta
    - name: keywords
      content: keyword1 keyword2
author: froq
created: 2025-04-14
last_modified: 2025-04-14
---

## Header 2 (==mark==, **strong**, _em_)

### Header 3 (<u>underline</u>, ~~strikethrough~~)

#### Header 4 (`inline code`, $\LaTeX$)

##### Header 5 ([internal link](api-examples.md), [external link](https://example.com))

###### Header 6 (<https://example.com>)

---

### Paragraph

This is a paragraph, which contains **strong**, _em_, ==mark==(optional), <u>underline</u>, ~~strikethrough~~, `inline code`, $\LaTeX$, [internal link](api-examples.md), [external link](https://example.com) and pure link <https://example.com> element.

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

:::

::: details
This is a details block...

...with something nested.

::: danger
This is a dangerous warning.
:::
:::

### Ordered List and Unordered List

1. This is an ordered list.
   1. With a sub-ordered list.
   - And an unordered list.
     - With a sub-unordered list.

### Table

| name  | description                          |
| :---: | :----------------------------------- |
| table | This is a table.<br>Multi-line cell. |
|  row  | Another row.                         |
| style | _And_ **some** `other` ==style==.    |
