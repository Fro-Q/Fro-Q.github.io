import posts from '../.vitepress/theme/src/posts.data'

export default {
  async paths() {
    const loadedPosts = await posts.load()

    const allTags = [...new Set(loadedPosts
      .map(post => post.tagsExtended)
      .flat())]
      .map((tag) => {
        return { params: { tag } }
      })

    console.warn(allTags)
    return allTags
  },
}
