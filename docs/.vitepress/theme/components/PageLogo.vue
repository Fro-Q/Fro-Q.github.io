<script setup lang="ts">
import SvgFroqLogo from './SvgFroqLogo.vue'
</script>

<template>
  <div
    un-absolute
    un-m-4
    un-top-0
    un-z-100
    un-md-fixed
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
