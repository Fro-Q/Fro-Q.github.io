<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { onClickOutside } from '@vueuse/core'
import { useData, useRoute } from 'vitepress'
import { onMounted, ref, useTemplateRef } from 'vue'
import { renderMdInline } from '../../utils/renderMdInline'
import { data as posts } from '../src/posts.data'
import LinkUnderline from './LinkUnderline.vue'

function formatDate(post: Data) {
  return new Date(post.created.raw).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  })
}
const { params } = useData()
const { path } = useRoute()

const showExtendedTags = ref(false)
const extendedTagsRef = useTemplateRef('extendedTagsRef')

onClickOutside(extendedTagsRef as any, () => {
  showExtendedTags.value = false
})

const postsHere = posts.filter(post => post.tags.includes(params.value?.tag))
const postsDeeper = posts.filter(post => post.tagsExtended.includes(params.value?.tag)).filter(post => !postsHere.includes(post))

const postsToShow = {
  在此: postsHere,
  更深处: postsDeeper,
}

const excerptVisible = ref(Object.fromEntries(Object.keys(postsToShow).map(category => [category, false])))

const thisTagHierarchy = params.value?.tag
  .split('/')
  .map((_tag: string, index: number, hierarchy: string[]) => {
    return hierarchy.slice(0, index + 1).join('/')
  })

const allTags = [...new Set(posts.map(post => post.tagsExtended).flat())].sort()
const thisTagExtended = allTags.filter(tag => tag.startsWith(params.value?.tag) && tag !== params.value?.tag)

const metaStrings = [
  `${postsHere.length} 篇在标签中`,
  `${postsDeeper.length} 篇在更深处`,
]

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
      const fullWidth = el.offsetWidth
      const windowHeight = window.innerHeight

      // if the height of the category wrapper is less than the height of the window,
      // then the progress bar should be 100%
      if (categoryWrapper.offsetHeight <= windowHeight) {
        el.style.setProperty('--progress-bar-width', `${fullWidth}px`)
        return
      }

      const percentage = Math.min(1, Math.max(0, (scrollY - wrapperOffsetY) / Math.max(0, categoryWrapper.offsetHeight - windowHeight)))
      el.style.setProperty('--progress-bar-width', `${percentage * fullWidth}px`)
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement
      if (entry.isIntersecting) {
        // add scroll event listener when the element enters the viewport
        document.addEventListener('scroll', () => handleScroll(el))
        window.addEventListener('resize', () => handleScroll(el))
      }
      else {
        // remove scroll event listener when the element leaves the viewport
        document.removeEventListener('scroll', () => handleScroll(el))
        window.removeEventListener('resize', () => handleScroll(el))
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
  <div
    :key="path"
  >
    <un-page-content>
      <div
        un-items-center
        un-flex="~ row"
        un-text="2xl/relaxed"
        un-my-10
      >
        <un-i-ph-tag-duotone
          un-w-6
          un-h-6
          un-mr-2
          un-inline-block
          un-align-middle
          un-text="sky-400 dark:sky-600"
        />
        <template
          v-for="tag, index in thisTagHierarchy"
          :key="tag"
        >
          <LinkUnderline
            :href="`/tags/${tag}`"
            :text="tag.split('/').pop()"
            :tooltip="true"
            :tooltip-text="tag"
            :un-text="index === thisTagHierarchy.length - 1
              ? `neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50`
              : `neutral-500 hover:neutral-950 dark:hover:neutral-50`"
            un-before="bg-sky-400 dark:bg-sky-600"
          />
          <span
            v-if="index < thisTagHierarchy.length - 1"
            un-inline-block
          >
            /
          </span>
        </template>
        <span
          un-inline-block
          un-relative
        >
          /
        </span>
        <div
          v-if="thisTagExtended.length > 0"
          un-relative
          un-inline-block
          un-ml-2
        >
          <span
            un-cursor-pointer
            un-text="neutral-500 hover:neutral-950 dark:hover:neutral-50"
            @click="showExtendedTags = !showExtendedTags"
          >
            ...
          </span>
          <div
            v-if="showExtendedTags"
            ref="extendedTagsRef"
            un-absolute
            un-z-20
            un-bg="neutral-100/60 dark:neutral-900/60"
            un-border="1px solid neutral-300 dark:neutral-700"
            un-shadow-lg
            un-rounded
            un-p-2
            un-top-full
            un-left-0
            un-mt-2
            un-min-w-max
            un-rounded-sm
            class="backdrop-blur"
          >
            <div
              v-for="tag in thisTagExtended"
              :key="tag"
            >
              <LinkUnderline
                :href="`/tags/${tag}`"
                :text="tag.replace(`${params?.tag}/`, '')"
                un-text="neutral-700 dark:neutral-300 hover:neutral-950 dark:hover:neutral-50 xl"
                un-before="bg-sky-400 dark:bg-sky-600"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        un-flex
        un-gap-5
        un-justify-end
        un-items-center
      >
        <div
          v-for="metaString in metaStrings"
          :key="metaString"
        >
          {{ metaString }}
        </div>
      </div>
    </un-page-content>
    <un-page-content
      v-for="(category) in ['在此', '更深处']"
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
          v-for="year in getAllYears(postsToShow[category])"
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
            un-w-fit
            un-px-4
          >
            {{ year.toString().replace(/\d/g, match => chinese[digits.indexOf(match)]) }}
          </div>
          <div
            v-for="post in postsToShow[category].filter(post => new Date(post.created.raw).getFullYear() === year)"
            :key="post.url"
            un-p-2
            un-ml-15
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
            <div
              v-show="excerptVisible[category]"
              un-text-neutral-500
              class="markdown-rendered"
              v-html="post.excerpt?.replace(/<p>|<\/p>/g, '')"
            />
          </div>
        </div>
      </div>
      <div
        v-if="postsToShow[category].length === 0"
      >
        <div
          v-if="category === '在此'"
        >
          <div
            un-text="2xl neutral-800 dark:neutral-200"
            un-my-10
            un-flex="~ row"
          >
            此处没有任何文章
          </div>
          <div
            un-text="2xl neutral-700 dark:neutral-300"
            un-my-10
            un-flex="~ row"
          >
            很可能是由于「{{ params?.tag }}」是一个泛类
          </div>
          <div
            un-text="2xl neutral-600 dark:neutral-400"
            un-my-10
            un-flex="~ row"
          >
            您需要看看
            <LinkUnderline
              un-align-base
              href="#更深处"
              text="更深处"
              un-text="cyan-500"
              un-before="bg-cyan-600 dark:bg-cyan-600/80"
            />
          </div>
        </div>
      </div>
    </un-page-content>
  </div>
</template>
