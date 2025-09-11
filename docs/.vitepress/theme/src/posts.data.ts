import { formatDate } from '@vueuse/core'
import { createContentLoader } from 'vitepress'
import { toChineseNumber } from '../../utils/toChineseNumber'

export interface Data {
  url: string
  frontmatter: Record<string, any>
  excerpt?: string
  created: Date
  lastModified: Date
  readingTime: number
  tagsExtended: string[]
  tags: string[]
  title: string
  groupProperty: {
    category: string
    chineseYear: string
  }
  html?: string
}

declare const data: Data[]
export { data }

function calculateReadingTime(text?: string): number {
  if (!text) {
    return 0
  }

  const WORDS_PER_MINUTE_ZH = 400
  const WORDS_PER_MINUTE_EN = 225
  const BLOCKS_PER_MINUTE_CODE = 1

  const content = text
    .replace(/---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/<[\s\S]*?>/g, '') // Remove HTML tags

  const countZh = content.match(/[\u4E00-\u9FA5]/g)?.length || 0
  const countEn = content.match(/[a-z]/gi)?.length || 0
  const countCodeBlocks = content.match(/```[\s\S]*?```/g)?.length || 0

  const minutes = Math.ceil(
    countZh / WORDS_PER_MINUTE_ZH
    + countEn / WORDS_PER_MINUTE_EN
    + countCodeBlocks * BLOCKS_PER_MINUTE_CODE,
  )

  return minutes
}

function dealTagHierarchy(tag: string): Set<string> {
  const tags = new Set<string>()
  const levels = tag.split('/')
  levels.forEach((_: string, i: number) => {
    tags.add(levels.slice(0, i + 1).join('/'))
  })

  return tags
}

function getTags(
  html: string | undefined,
  frontmatter: Record<string, any>,
): {
  tags: Set<string>
  tagsExtended: Set<string>
} {
  let tagsExtended: Set<string> = new Set()
  const tags: Set<string> = new Set()

  if (!html) {
    return {
      tags,
      tagsExtended,
    }
  }

  const tagReg = /<a href="\/tags\/[^"]*">\s*<span class="tag">(.*?)<\/span>\s*<\/a>/g
  let match: RegExpExecArray | null = tagReg.exec(html)

  while (match) {
    tags.add(match[1])
    tagsExtended = new Set([...tagsExtended, ...dealTagHierarchy(match[1])])
    match = tagReg.exec(html)
  }

  if (frontmatter.tags) {
    frontmatter.tags.forEach((tag: string) => {
      tags.add(tag)
      tagsExtended = new Set([...tagsExtended, ...dealTagHierarchy(tag)])
    })
  }

  return {
    tags,
    tagsExtended,
  }
}

export default createContentLoader('posts/**/*.md', {
  includeSrc: true,
  excerpt: true,
  render: true,
  transform(raw) {
    return raw.map(({ html, url, frontmatter, excerpt, src }) => ({
      url,
      frontmatter,
      excerpt,
      created: new Date(frontmatter.created),
      lastModified: new Date(frontmatter.last_modified),
      readingTime: calculateReadingTime(src),
      tags: [...getTags(html, frontmatter).tags],
      tagsExtended: [...getTags(html, frontmatter).tagsExtended],
      title: frontmatter.title,
      groupProperty: {
        category: frontmatter.category,
        chineseYear: toChineseNumber(String(new Date(frontmatter.created).getFullYear())),
      },
    }))
      .sort((a, b) => b.created.getTime() - a.created.getTime())
  },
})
