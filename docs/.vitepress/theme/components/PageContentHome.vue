<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { meta } from '@babel/eslint-parser'
import { onMounted, ref, watch } from 'vue'
import { data as posts } from '../src/posts.data'
import LinkUnderline from './LinkUnderline.vue'

function formatDate(post: Data) {
  return new Date(post.created.raw).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  })
}

const categories: string[] = ['全', ...new Set(posts.map(post => post.frontmatter.category))]
const excerptVisible = ref(Object.fromEntries(categories.map(category => [category, false])))

const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '○']
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

function getAllYears(posts: Data[]) {
  return Array.from(
    new Set(posts.map(post =>
      new Date(post.created.raw)
        .getFullYear(),
    )),
  )
}

onMounted(() => {
  const handleScroll = (el: HTMLElement) => {
    const categoryWrapper = el.parentElement
    if (categoryWrapper) {
      const scrollY = window.scrollY
      const wrapperOffsetY = categoryWrapper.offsetTop
      const wrapperWidth = categoryWrapper.offsetWidth
      const windowHeight = window.innerHeight

      // if the height of the category wrapper is less than the height of the window,
      // then the progress bar should be 100%
      if (categoryWrapper.offsetHeight <= windowHeight) {
        el.style.setProperty('--progress-bar-width', `${wrapperWidth}px`)
        return
      }

      const percentage = Math.min(1, Math.max(0, (scrollY - wrapperOffsetY) / Math.max(0, categoryWrapper.offsetHeight - windowHeight)))
      el.style.setProperty('--progress-bar-width', `${percentage * wrapperWidth}px`)
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement
      if (entry.isIntersecting) {
        // add scroll event listener when the element enters the viewport
        document.addEventListener('scroll', () => handleScroll(el))
      }
      else {
        // remove scroll event listener when the element leaves the viewport
        document.removeEventListener('scroll', () => handleScroll(el))
      }
      handleScroll(el)
    })
  }, { threshold: 0 }) // trigger when the element enters the viewport

  document.querySelectorAll<HTMLElement>('.title-wrapper').forEach((el: HTMLElement) => {
    observer.observe(el)
  })
})
</script>

<template>
  <un-page-content un-min-h-100vh>
    <div
      un-select-none
      un-text="neutral-700 dark:neutral-300 3xl"
      un-h="[calc(100vh-100px)]"
      un-flex="~ col grow-1"
      un-justify-center
    >
      <div
        un-mb-10
        un-inline
      >
        您好。<br>我是 froQ ，一位

        <div
          un-relative
          un-inline
        >
          <input
            id="self-description"
            type="text"
            un-z-20
            un-appearance-none
            un-rounded-none
            un-bg-transparent
            un-shadow="emerald-500 [0px_2px_0px_0px]"
            un-outline-none
            un-text-center
            un-font-thin
            un-inline
            un-relative
            autocomplete="off"
            maxlength="10"
          >
        </div>
        。
      </div>
      <br>
      <div>
        不太擅长给自己贴标签，或许您能帮我贴一个。
      </div>
    </div>
  </un-page-content>
  <un-page-content un-min-h-100vh>
    <div
      class="title-wrapper"
      un-sticky
      un-top-0
      un-py-10
      un-z-10
      un-bg="neutral-50 dark:neutral-950"
    >
      <div
        class="progress-bar"
      >
        <div
          class="progress-bar-inner"
          un-bg="neutral-600 dark:neutral-400"
          :style="{ width: 'var(--progress-bar-width, 0)' }"
          un-h-2px
          un-absolute
          un-bottom-0
          un-z-1
        />
        <div
          class="progress-bar-bg"
          un-bg="neutral-200 dark:neutral-800"
          un-w-full
          un-h-2px
          un-absolute
          un-bottom-0
          un-z-0
        />
      </div>
      <h2
        un-my-4
        un-text-4xl
      >
        目录
      </h2>
    </div>
    <div
      v-for="category in categories"
      :key="category"
      un-ml="[25%]"
      un-even="pl-10"
      un-my-10
    >
      <LinkUnderline
        :href="`#${category}`"
        :text="category"
        un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 2xl"
        un-before="bg-rose-600 dark:bg-rose-400"
        un-italic
      />
    </div>
  </un-page-content>
  <un-page-content
    v-for="category in categories"
    :key="category"
    un-min-h-100vh
  >
    <div
      class="title-wrapper"
      un-sticky
      un-top-0
      un-py-10
      un-z-10
      un-bg="neutral-50 dark:neutral-950"
    >
      <div
        class="progress-bar"
      >
        <div
          class="progress-bar-inner"
          un-bg="neutral-600 dark:neutral-400"
          :style="{ width: 'var(--progress-bar-width, 0)' }"
          un-h-2px
          un-absolute
          un-bottom-0
          un-z-1
        />
        <div
          class="progress-bar-bg"
          un-bg="neutral-200 dark:neutral-800"
          un-w-full
          un-h-2px
          un-absolute
          un-bottom-0
          un-z-0
        />
      </div>
      <h2
        :id="category"
        un-my-4
        un-text-4xl
      >
        {{ category }}
      </h2>
      <div
        un-flex="~ row"
        un-items-center
      >
        <input
          :id="`${category}-excerpt`"
          v-model="excerptVisible[category]"
          type="checkbox"
          un-appearance-none
          un-w-4
          un-h-4
          un-rounded-sm
          un-relative
          un-transition
          un-border="px neutral-600"
          un-before="transition content-empty bg-neutral-800 dark:bg-neutral-200 w-2 h-2 scale-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-none"
          un-checked="border-neutral-600 dark:border-neutral-400 before:scale-100"
          un-hover="border-neutral-800 dark:border-neutral-200 before:scale-20 checked:before:scale-100"
        >
        <label
          :for="`${category}-excerpt`"
          un-ml-2
          un-text="neutral-600 dark:neutral-400 base"
          un-block
          un-flex="~ row"
          un-items-center
        >
          已
          <div>
            <span
              un-inline-block
              un-transition-all
              un-duration-400
              un-text="rose-600 dark:rose-400"
              :un-translate-y="excerptVisible[category] ? '100%' : '0'"
              :un-opacity="excerptVisible[category] ? '0' : '100'"
              un-absolute
            >
              隐藏
            </span>
            <span
              un-inline-block
              un-transition-all
              un-duration-400
              un-text="emerald-600 dark:emerald-400"
              :un-translate-y="excerptVisible[category] ? '0' : '-100%'"
              :un-opacity="excerptVisible[category] ? '100' : '0'"
            >
              显示
            </span>
          </div>
          摘要
        </label>
      </div>
    </div>
    <div
      un-flex="~ col"
      un-items-end
      un-w-full
    >
      <div
        v-for="year in getAllYears(posts.filter(post => category === '全' ? posts : post.frontmatter.category === category))"
        :key="year"
        un-py-10
        un-flex="~ col"
        un-gap-4
        un-w-full
      >
        <div
          un-text-3xl
          un-text="neutral-600 dark:neutral-400 2xl"
          un-sticky
          un-top-50
          style="writing-mode: vertical-lr;"
          un-z-2
          un-w-max
        >
          {{ year.toString().replace(/\d/g, match => chinese[digits.indexOf(match)]) }}
        </div>
        <div
          v-for="post in posts.filter(post => new Date(post.created.raw).getFullYear() === year).filter(post => category === '全' ? posts : post.frontmatter.category === category)"
          :key="post.url"
          un-p-2
          un-ml-10
          un-flex="~ col"
          un-gap-2
          un-items-end
          un-relative
        >
          <div
            un-flex="~ row"
            un-items-center
            un-max-w-full
          >
            <div
              un-text="neutral-500 dark:neutral-400 base"
              un-mr-2
              un-whitespace-nowrap
            >
              {{ formatDate(post) }}
            </div>
            <LinkUnderline
              :href="post.url"
              :text="post.frontmatter.title"
              :tooltip="true"
              :tooltip-text="post.frontmatter.title"
              un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 2xl"
              un-before="bg-emerald-600 dark:bg-emerald-600/80"
              un-text-align="right"
            >
              <template #tooltipAddons>
                <div
                  un-flex="~ row"
                  un-text="sm neutral-600 dark:neutral-400"
                  un-justify-end
                  un-gap-5
                >
                  {{ `约${post.readingTime.toString()}分钟` }}
                </div>
              </template>
            </LinkUnderline>
          </div>

          <p
            v-show="excerptVisible[category]"
            un-text-neutral-500
            v-html="post.excerpt"
          />
          <div
            un-text-neutral-500
            un-flex
            un-gap-5
            un-text-sm
          />
        </div>
      </div>
    </div>
  </un-page-content>
</template>
