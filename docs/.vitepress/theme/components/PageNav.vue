<script setup lang="ts">
import { onMounted, ref, triggerRef } from 'vue'

const htmlEl: HTMLElement | null = document.querySelector('html')

if (!htmlEl) {
  throw new Error('HTML element not found')
}

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
  <nav class="flex flex-row justify-between p-4">
    <div class="m-2">
      <a
        class="font-[noteworthy] text-5xl text-neutral-800 dark:text-neutral-200"
        href="/"
      >HOME</a>
    </div>
    <div class="flex flex-row items-center gap-6 text-xl">
      <a
        class="m-1 flex h-6 w-6 cursor-pointer items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-700 dark:hover:text-neutral-300"
        href="https://github.com/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" />
            <path
              d="M14.333 19v-1.863c.025-.31-.018-.62-.126-.913a2.2 2.2 0 0 0-.5-.781c2.093-.227 4.293-1 4.293-4.544a3.48 3.48 0 0 0-1-2.434a3.2 3.2 0 0 0-.06-2.448s-.787-.227-2.607.961a9.15 9.15 0 0 0-4.666 0c-1.82-1.188-2.607-.96-2.607-.96A3.2 3.2 0 0 0 7 8.464a3.48 3.48 0 0 0-1 2.453c0 3.519 2.2 4.291 4.293 4.544a2.2 2.2 0 0 0-.496.773a2.1 2.1 0 0 0-.13.902V19"
            />
            <path d="M9.667 17.702c-2 .631-3.667 0-4.667-1.948" />
          </g>
        </svg>
      </a>
      <div
        class="m-1 flex h-6 w-6 cursor-pointer items-center justify-center text-neutral-500 transition-colors duration-200 hover:text-neutral-700 dark:hover:text-neutral-300"
        @click="darkMode.state = htmlEl.classList.contains('dark') ? false : true"
      >
        <svg
          v-if="darkMode.state"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 19H8a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2m9-4h-1.16A8.2 8.2 0 0 0 20 12.05a1 1 0 0 0-.34-.93a1 1 0 0 0-1-.19a6 6 0 0 1-1.92.32a6.06 6.06 0 0 1-6.06-6a7 7 0 0 1 .1-1a1 1 0 0 0-.35-.92a1 1 0 0 0-1-.18A8.06 8.06 0 0 0 4 10.68A8 8 0 0 0 5.27 15H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2m-3.72 0H7.83a6 6 0 0 1 .88-9.36a8.06 8.06 0 0 0 8.05 7.61a7 7 0 0 0 .79 0A6.1 6.1 0 0 1 16.28 15M16 19h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.66 8.34a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.66.71a1 1 0 0 0 0 1.41a1 1 0 0 0 .66.29M12 6a1 1 0 0 0 1-1V4a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1m-8 6H3a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m1.64-3.95a1 1 0 0 0 .7.29a1 1 0 0 0 .71-.29a1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41ZM21 12h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2m-10 7H8a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2m7-4h-.88a5.4 5.4 0 0 0 .38-2a5.5 5.5 0 0 0-11 0a5.4 5.4 0 0 0 .38 2H6a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2m-3.15 0h-5.7a3.44 3.44 0 0 1-.65-2a3.5 3.5 0 0 1 7 0a3.44 3.44 0 0 1-.65 2M16 19h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2"
          />
        </svg>
      </div>
    </div>
  </nav>
</template>
