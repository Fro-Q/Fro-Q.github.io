<script setup lang="ts">
import { useData } from "vitepress";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();

const switchDarkMode = (): void => {
  const htmlEl: HTMLElement | null = document.querySelector("html");
  htmlEl?.classList.toggle("dark");
};
</script>

<template>
  <nav class="flex justify-between p-4">
    <a
      class="text-blue-500 hover:underline"
      href="/"
      >Home</a
    >
    <div
      class="dark-mode-switcher w-20 bg-neutral-300 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
      @click="switchDarkMode"
    >
      Switch
    </div>
  </nav>

  <div
    class="mx-auto max-w-[700px]"
    v-if="frontmatter.home"
  >
    <h1 class="m-4 text-center text-4xl">{{ site.title }}</h1>
    <div class="m-4 min-h-[200px] text-center">
      <p>{{ site.description }}</p>
    </div>
    <ul class="flex flex-col space-y-2">
      <li class="text-blue-500"><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li class="text-blue-500"><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div
    v-else
    class="mx-auto max-w-[700px]"
  ></div>
  <Content
    class="mx-auto max-w-[700px]"
    id="content"
    :class="frontmatter.home ? 'home-page' : ''"
  />
</template>
