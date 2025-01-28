<script setup lang="ts">
import { useData } from "vitepress";
import PageContentHome from "./PageContentHome.vue";
import PageContentPost from "./PageContentPost.vue";

const { frontmatter } = useData();
</script>

<template>
  <PageContentHome v-if="frontmatter.home" />
  <PageContentPost v-else />
</template>
