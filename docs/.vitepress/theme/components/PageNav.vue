<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav
    un-flex="~ row"
    un-justify-end
    un-p-4
  >
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
        @click="toggleDark()"
      >
        <ClientOnly>
          <un-i-ph-moon-duotone v-if="isDark" />
          <un-i-ph-sun-duotone v-else />
        </ClientOnly>
      </div>
    </div>
  </nav>
</template>
