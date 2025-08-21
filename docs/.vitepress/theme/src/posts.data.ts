import { createContentLoader } from 'vitepress'

interface FormattedDate {
  raw: Date
  formattedString: string
}

interface ReadingTimeInfo {
  minutes: number
  words: number
}

export interface Data {
  url: string
  frontmatter: Record<string, any>
  excerpt?: string
  created: FormattedDate
  lastModified: FormattedDate
  readingInfo: ReadingTimeInfo
}

declare const data: Data[]
export { data }

function formatDate(raw: string): FormattedDate {
  const date = new Date(raw)
  return {
    raw: date,
    formattedString: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }),
  }
}

function calculateReadingTime(text?: string): ReadingTimeInfo {
  if (!text) {
    return { minutes: 0, words: 0 }
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

  const words = Math.ceil((countZh + countEn) / 100) * 100

  return {
    minutes,
    words,
  }
}

export default createContentLoader('posts/*.md', {
  includeSrc: true,
  excerpt: true,
  transform(raw) {
    return raw.map(({ url, frontmatter, excerpt, src }) => ({
      url,
      frontmatter,
      excerpt,
      created: formatDate(frontmatter.created),
      lastModified: formatDate(frontmatter.last_modified),
      readingInfo: calculateReadingTime(src),
    }))
      .sort((a, b) => b.created.raw.getTime() - a.created.raw.getTime())
  },
})
