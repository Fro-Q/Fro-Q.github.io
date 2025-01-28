<script setup lang="ts">
import { useData } from "vitepress";
import { data as posts } from "../src/posts.data";

const { site } = useData();
</script>

<template>
     <div class="mx-auto max-w-[700px]">
    <h1 class="m-4 text-center text-4xl">{{ site.title }}</h1>
    <div class="m-4 min-h-[200px] text-center">
         <p>{{ site.description }}</p>
    </div>
    <div>
      <div
        class="py-2 text-neutral-600 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        v-for="post in posts"
        :key="post.url"
      >
        <a
          class="text-2xl"
          :href="post.url"
          >{{ post.frontmatter.title }}</a
        >
      </div>
    </div>
  </div>
</template>
