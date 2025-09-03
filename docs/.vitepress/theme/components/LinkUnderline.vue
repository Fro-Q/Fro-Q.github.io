<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>

<template>
  <div
    un-max-w-full
    un-inline-block
    un-duration-400
    un-relative
    un-px-2
    un-after="content-empty bg-neutral-200 dark:bg-neutral-800 w-full h-2px absolute bottom-0 left-0 z-0"
    un-before-w-0
    un-before-h-3px
    un-before-left-0
    un-before-bottom-0
    un-before-z-1
    un-before-rounded-none
    un-before-absolute
    un-hover-before-w-full
    un-before-transition-width
    un-before-content-empty
  >
    <a
      un-inline-block
      un-max-w-full
      un-whitespace-nowrap
      un-text-ellipsis
      un-overflow-hidden
      :href="href"
    >
      {{ text }}
    </a>
  </div>
</template>
