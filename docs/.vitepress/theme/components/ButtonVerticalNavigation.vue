<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const showBackToTop = ref(false)
const showScrollToBottom = ref(true)

function handleScroll() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

  showBackToTop.value = scrollTop > 0
  showScrollToBottom.value = scrollTop + clientHeight < scrollHeight
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    un-fixed
    un-left-20px
    un-bottom-20px
    un-flex-col
    un-gap-2
    un-z-1000
  >
    <button
      :un-opacity="showBackToTop ? 100 : 0"
      un-bg-vp-c-brand-1
      un-text-white
      un-border-none
      un-rounded-full
      un-w-10
      un-h-10
      un-flex
      un-items-center
      un-justify-center
      un-cursor-pointer
      un-transition
      un-duration-300
      @click="scrollToTop"
    >
      <un-i-ph-arrow-up-duotone />
    </button>
    <button
      :un-opacity="showScrollToBottom ? 100 : 0"
      un-bg-vp-c-brand-1
      un-text-white
      un-border-none
      un-rounded-full
      un-w-10
      un-h-10
      un-flex
      un-items-center
      un-justify-center
      un-cursor-pointer
      un-transition
      un-duration-300
      @click="scrollToBottom"
    >
      <un-i-ph-arrow-down-duotone />
    </button>
  </div>
</template>
