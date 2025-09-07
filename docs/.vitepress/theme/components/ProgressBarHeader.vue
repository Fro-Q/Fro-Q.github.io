<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  title: string
  id?: string
}>()

function handleScroll(el: HTMLElement) {
  const categoryWrapper = el.parentElement
  if (categoryWrapper) {
    const scrollY = window.scrollY
    const wrapperOffsetY = categoryWrapper.offsetTop
    const fullWidth = el.offsetWidth
    const windowHeight = window.innerHeight

    // if the height of the category wrapper is less than the height of the window,
    // then the progress bar should be 100%
    if (categoryWrapper.offsetHeight <= windowHeight) {
      el.style.setProperty('--progress-bar-width', `${fullWidth}px`)
      return
    }

    const percentage = Math.min(1, Math.max(0, (scrollY - wrapperOffsetY) / Math.max(0, categoryWrapper.offsetHeight - windowHeight)))
    el.style.setProperty('--progress-bar-width', `${percentage * fullWidth}px`)
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement
      if (entry.isIntersecting) {
        // add scroll event listener when the element enters the viewport
        document.addEventListener('scroll', () => handleScroll(el))
        window.addEventListener('resize', () => handleScroll(el))
      }
      else {
        // remove scroll event listener when the element leaves the viewport
        document.removeEventListener('scroll', () => handleScroll(el))
        window.removeEventListener('resize', () => handleScroll(el))
      }
      handleScroll(el)
    })
  }, { threshold: 0 }) // trigger when the element enters the viewport

  const titleWrapper = document.getElementById(props.id || 'title-wrapper')
  if (titleWrapper) {
    observer.observe(titleWrapper)
  }
})

onUnmounted(() => {
  // Clean up event listeners if component is unmounted
  const titleWrapper = document.getElementById(props.id || 'title-wrapper')
  if (titleWrapper) {
    document.removeEventListener('scroll', () => handleScroll(titleWrapper))
    window.removeEventListener('resize', () => handleScroll(titleWrapper))
  }
})
</script>

<template>
  <div
    :id="id || 'title-wrapper'"
    un-sticky
    un-top-0
    un-py-10
    un-z-10
    un-bg="neutral-50 dark:neutral-950"
    class="title-wrapper"
  >
    <div class="progress-bar">
      <div
        class="progress-bar-inner"
        un-bg="neutral-600 dark:neutral-400"
        :style="{ width: 'var(--progress-bar-width, 0)' }"
        un-h-2px
        un-absolute
        un-bottom-0
        un-z-1
      />
      <div
        class="progress-bar-bg"
        un-bg="neutral-200 dark:neutral-800"
        un-w-full
        un-h-2px
        un-absolute
        un-z-0
        un-bottom-0
      />
    </div>
    <h2
      un-my-4
      un-text-4xl
    >
      {{ title }}
    </h2>
    <slot />
  </div>
</template>
