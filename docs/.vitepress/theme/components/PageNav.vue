<script setup lang="ts">
import { onMounted, ref, triggerRef } from 'vue'

const htmlEl: HTMLElement = document.querySelector('html')!

const darkMode = ref({
  get state(): boolean {
    return htmlEl.classList.contains('dark')
  },

  set state(value: boolean) {
    if (value) {
      htmlEl.classList.add('dark')
    }
    else {
      htmlEl.classList.remove('dark')
    }
  },
})

onMounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    triggerRef(darkMode)
  })
})
</script>

<template>
  <nav
    un-flex="~ row"
    un-justify-between
    un-p-4
  >
    <un-m-2>
      <a
        un-text="5xl neutral-800 dark:neutral-200"
        un-font="[noteworthy]"
        href="/"
      >HOME</a>
    </un-m-2>
    <div
      un-flex="~ row"
      un-items-center
      un-gap-6
      un-text-xl
    >
      <a
        un-m-1
        un-h-6
        un-w-6
        un-flex
        un-items-center
        un-justify-center
        un-text="neutral-500 hover:neutral-700 dark:hover:neutral-300"
        un-transition-colors
        un-duration-200
        href="https://github.com/"
      >
        <un-i-ph-github-logo-duotone />
      </a>
      <div
        un-m-1
        un-h-6
        un-flex
        un-cursor-pointer
        un-items-center
        un-justify-center
        un-text="neutral-500 hover:neutral-700 dark:hover:neutral-300"
        un-transition-colors
        un-duration-200
        @click="darkMode.state = htmlEl.classList.contains('dark') ? false : true"
      >
        <un-i-ph-moon-duotone v-if="darkMode.state" />
        <un-i-ph-sun-duotone v-else />
      </div>
    </div>
  </nav>
</template>
