/**
 * Formats a date string or Date object into a localized string.
 * @param dateInput The date string or Date object to format.
 * @returns A formatted date string (e.g., "九月 7, 2025").
 */
export function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formats a date string or Date object into a localized string without the year.
 * @param dateInput The date string or Date object to format.
 * @returns A formatted date string (e.g., "九月 7").
 */
export function formatMonthDay(dateInput: string | Date): string {
  const date = new Date(dateInput)
  return date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  })
}
