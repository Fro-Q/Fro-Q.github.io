<script setup>
import { useData } from "vitepress";
import { computed, onMounted, ref, triggerRef } from "vue";
import { selfDesc } from "../utils/selfDesc";

const { page, site, frontmatter } = useData();

const socialLinks = site.value.themeConfig.socialLinks;
const navUtilsConfig = site.value.themeConfig.navUtils;

const htmlEl = document.querySelector("html");

let darkMode = ref({
  get state() {
    return htmlEl.classList.contains("dark");
  },

  set state(value) {
    toggleDarkClass(value);
  },
});

const toggleDarkClass = (value) => {
  if (value) {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }
};

onMounted(() => {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    triggerRef(darkMode);
  });
});
</script>

<template>
  <div class="navbar sticky z-40 h-auto w-full select-none bg-neutral-50 p-5 dark:bg-neutral-950">
    <div class="navbar-inner box-border flex h-full flex-row items-center justify-between">
      <div class="brand flex flex-row items-end gap-4">
        <h1 class="brand-title relative flex gap-5 px-2 text-5xl">
          <a
            href="/"
            class="font-['noteworthy'] font-light text-neutral-600 transition duration-200 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            <Logo blinking="true"></Logo>
          </a>
          <div
            class="m-auto inline-block h-max rotate-3 rounded-sm border border-emerald-500 px-2 py-1 align-bottom text-[0.4em] font-bold text-emerald-500"
            v-if="selfDesc.content"
          >
            #{{ selfDesc.content }}
          </div>
        </h1>
      </div>
      <div class="flex flex-row gap-6">
        <div class="links flex flex-row gap-4">
          <div
            class="link-wrapper align-middle"
            v-for="link in socialLinks"
            :key="link.ariaLabel"
          >
            <a
              :href="link.link"
              class="link m-1 block text-xl text-neutral-500 transition-colors duration-200 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200"
              :title="link.ariaLabel"
            >
              <div
                v-html="link.icon.svg"
                class="icon flex h-6 w-6 items-center justify-center"
              ></div>
            </a>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <div
            class="link-wrapper align-middle"
            v-for="util in navUtilsConfig"
            :key="util.ariaLabel"
          >
            <div
              @click="darkMode.state = htmlEl.classList.contains('dark') ? false : true"
              class="link m-1 block cursor-pointer text-xl transition-colors duration-200"
              :title="util.ariaLabel"
            >
              <div
                v-html="util.icon.svg[darkMode.state ? 'on' : 'off']"
                class="icon flex h-6 w-6 items-center justify-center transition-colors duration-200"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
