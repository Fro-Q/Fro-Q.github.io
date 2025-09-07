import type { Data } from '../theme/src/posts.data'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as posts } from '../theme/src/posts.data'

/**
 * Provides utility functions and computed properties for filtering posts.
 */
export function usePostFilters() {
  const { params } = useData()

  const allPosts = computed(() => posts)

  /**
   * Filters posts based on the current tag in the route parameters.
   * Posts are included if their `tags` array directly contains the tag.
   */
  const postsInCurrentTag = computed(() => {
    if (!params.value?.tag)
      return []
    return posts.filter(post => post.tags.includes(params.value!.tag))
  })

  /**
   * Filters posts based on the current tag in the route parameters,
   * looking into `tagsExtended`. Excludes posts already found in `postsInCurrentTag`.
   */
  const postsInExtendedTags = computed(() => {
    if (!params.value?.tag)
      return []
    return posts.filter(post =>
      post.tagsExtended.includes(params.value!.tag)
      && !postsInCurrentTag.value.includes(post),
    )
  })

  /**
   * Filters posts by category.
   * @param category The category to filter by. If '全', all posts are returned.
   * @returns A filtered array of posts.
   */
  const filterPostsByCategory = (category: string): Data[] => {
    return category === '全' ? posts : posts.filter(post => post.frontmatter.category === category)
  }

  /**
   * Filters posts by year.
   * @param year The year to filter by.
   * @param postsToFilter The array of posts to apply the year filter to.
   * @returns A filtered array of posts.
   */
  const filterPostsByYear = (year: number, postsToFilter: Data[]): Data[] => {
    return postsToFilter.filter(post => new Date(post.created.raw).getFullYear() === year)
  }

  /**
   * Gets all unique years from a given array of posts.
   * @param postsToProcess The array of posts to extract years from.
   * @returns An array of unique years.
   */
  const getAllYears = (postsToProcess: Data[]): number[] => {
    return Array.from(
      new Set(postsToProcess.map(post => new Date(post.created.raw).getFullYear())),
    )
  }

  /**
   * Finds a single post by its title from the global posts data.
   * @param title The title of the post to find.
   * @returns The found post or undefined if not found.
   */
  const findPostByTitle = (title: string): Data | undefined => {
    return posts.find(post => post.frontmatter.title === title)
  }

  /**
   * Computes the next post in a given pool of posts.
   * @param currentPost The current post.
   * @param postPool The pool of posts to search within.
   * @returns The next post or null if no next post.
   */
  const getNextPost = (currentPost: Data, postPool: Data[]): Data | null => {
    const currentIndex = postPool.indexOf(currentPost)
    if (currentIndex === 0) {
      return null
    }
    return postPool[currentIndex - 1]
  }

  /**
   * Computes the previous post in a given pool of posts.
   * @param currentPost The current post.
   * @param postPool The pool of posts to search within.
   * @returns The previous post or null if no previous post.
   */
  const getPrevPost = (currentPost: Data, postPool: Data[]): Data | null => {
    const currentIndex = postPool.indexOf(currentPost)
    if (currentIndex === postPool.length - 1) {
      return null
    }
    return postPool[currentIndex + 1]
  }

  /**
   * Computes all unique categories from all posts, sorted alphabetically.
   */
  const allUniqueCategories = computed(() => {
    return [...new Set(posts.map(post => post.frontmatter.category))].sort()
  })

  return {
    allPosts,
    postsInCurrentTag,
    postsInExtendedTags,
    filterPostsByCategory,
    filterPostsByYear,
    getAllYears,
    findPostByTitle,
    getNextPost,
    getPrevPost,
    allUniqueCategories,
  }
}
