<script setup lang="ts">
import SvgFroqLogo from './SvgFroqLogo.vue'
</script>

<template>
  <div
    un-fixed
    un-m-4
  >
    <a
      class="group"
      un-text="5xl neutral-600 dark:neutral-400"
      href="/"
    >
      <SvgFroqLogo :animated="true" />
    </a>
  </div>
</template>
