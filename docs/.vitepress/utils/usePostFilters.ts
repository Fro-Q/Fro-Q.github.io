import type { Data } from '../theme/src/posts.data'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { data as posts } from '../theme/src/posts.data'

/**
 * Provides utility functions and computed properties for filtering posts.
 */
export function usePostFilters() {
  const { params } = useData()

  /**
   * A computed property containing all posts.
   */
  const allPosts = computed(() => posts)

  /**
   * Returns an array of unique values for a given key in all posts.
   * @param key The key to get unique values for.
   * @param _posts Optional posts to filter, defaults to all posts.
   * @returns An array of unique values.
   */
  const getUniqueGroupProperty = (
    key: string,
    _posts: Data[] = allPosts.value,
  ) => {
    return [
      ...new Set(_posts.map((post) => {
        return post.groupProperty[key as keyof Data]
      })),
    ]
  }

  /**
   * Returns a new object with the posts grouped by a given key.
   * @param key The key to group by.
   * @param _posts Optional posts to group, defaults to all posts.
   * @returns A new object with the grouped posts.
   */
  const groupByProperty = (
    key: string,
    _posts: Data[] = allPosts.value,
  ) => {
    return _posts.reduce((acc, post) => {
      const group = post.groupProperty[key as keyof Data]
      if (!acc[group])
        acc[group] = []
      acc[group].push(post)
      return acc
    }, {} as Record<string, Data[]>)
  }

  /**
   * Computes a post list grouped by a given key.
   * @param groupKey The key to group by.
   * @param subGroupKey The sub-group key.
   * @returns A computed property containing the post list.
   */
  const generatePostList = (
    groupKey: string,
    subGroupKey: string,
  ) => {
    return computed(() => {
      const uniqueGroups = groupKey === '-'
        ? ['-']
        : getUniqueGroupProperty(groupKey)

      const uniqueSubGroups = subGroupKey === '-'
        ? ['-']
        : getUniqueGroupProperty(subGroupKey)

      const postList: Record<string, Record<string, Data[]>> = {}
      uniqueGroups.forEach((group) => {
        postList[group] = {}
        uniqueSubGroups.forEach((subGroup) => {
          postList[group][subGroup] = []
        })
      })

      posts.forEach((post) => {
        const thisGroup = post.groupProperty[groupKey as keyof Data] || '-'
        const thisSubGroup = post.groupProperty[subGroupKey as keyof Data] || '-'

        postList[thisGroup][thisSubGroup].push(post)
      })

      Object.keys(postList).forEach((group) => {
        Object.keys(postList[group]).forEach((subGroup) => {
          if (postList[group][subGroup].length === 0)
            delete postList[group][subGroup]
        })
      })

      return postList
    })
  }

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
   * Finds a single post by its title from the global posts data.
   * @param title The title of the post to find.
   * @returns The found post or undefined if not found.
   */
  const findPostByTitle = (title: string): Data | undefined => {
    return posts.find(post => post.frontmatter.title === title)
  }

  /**
   * Finds a single post by its url from the global posts data.
   * @param url The url of the post to find.
   * @returns The found post or undefined if not found.
   */
  const findPostByUrl = (url: string): Data | undefined => {
    return posts.find(post => post.url === url)
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

  /**
   * Filters posts by a given key-value pair in the frontmatter.
   * @param key The key to filter by.
   * @param value The value to filter by.
   * @returns An array of posts that match the filter.
   */
  const filterPostsByFrontmatter = (key: string, value: string) => {
    return posts.filter(post => post.frontmatter[key] === value)
  }

  /**
   * Filters posts by a given key-value pair in the post object.
   * @param key The key to filter by.
   * @param value The value to filter by.
   * @returns An array of posts that match the filter.
   */
  const filterPostsByPostProperty = (key: string, value: string) => {
    return posts.filter(post => post[key] === value)
  }

  return {
    allPosts,
    getUniqueGroupProperty,
    groupByProperty,
    generatePostList,
    postsInCurrentTag,
    postsInExtendedTags,
    findPostByTitle,
    findPostByUrl,
    getNextPost,
    getPrevPost,
    allUniqueCategories,
    filterPostsByFrontmatter,
    filterPostsByPostProperty,
  }
}
