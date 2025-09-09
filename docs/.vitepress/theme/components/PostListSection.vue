<script setup lang="ts">
import { computed } from 'vue'
import { formatMonthDay } from '../../utils/formatDate'
import { toChineseNumber } from '../../utils/toChineseNumber'
import CheckboxToggle from './CheckboxToggle.vue'
import LinkUnderline from './LinkUnderline.vue'
import ProgressBarHeader from './ProgressBarHeader.vue'

const props = defineProps<{
  /**
   * The category string, used for section ID and excerpt visibility toggle.
   */
  category: string
  /**
   * Array of posts to be displayed in this section.
   */
  posts: any[] // TODO: Define a more specific type for post
  /**
   * Boolean to control the visibility of excerpts for the current category.
   */
  excerptVisible: boolean
  /**
   * Function to get all unique years from a given list of posts.
   */
  getAllYears: (posts: any[]) => number[]
  /**
   * The title of the section.
   */
  title: string
  /**
   * Custom message to display when there are no posts in the current category.
   */
  emptyMessage?: string
  /**
   * Boolean to control the visibility of the excerpt toggle.
   */
  showExcerptToggle?: boolean
}>()

const emit = defineEmits(['update:excerptVisible'])

// Computed property to filter posts by the current category and year
const filteredPostsByYear = computed(() => (year: number) => {
  return props.posts.filter(post => new Date(post.created.raw).getFullYear() === year)
})

// Handle excerpt toggle change
function handleExcerptToggle(value: boolean) {
  emit('update:excerptVisible', value)
}

// Handle tags toggle change
</script>

<template>
  <un-page-content un-min-h-100vh>
    <!-- Section title and progress bar -->
    <!-- <div
      class="title-wrapper"
      un-sticky
      un-top-0
      un-py-10
      un-z-10
      un-bg="neutral-50 dark:neutral-950"
    >
      <div class="progress-bar">
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
        un-py-2
      >
        {{ title }}
      </h2>

    </div> -->

    <ProgressBarHeader
      :id="title"
      :title="title"
    >
      <template #default>
        <div
          un-flex="~ row"
          un-items-center
          un-gap-4
        >
          <div
            v-if="showExcerptToggle"
            un-flex="~ row"
            un-items-center
          >
            <CheckboxToggle
              :id="`${category}-excerpt`"
              :model-value="excerptVisible"
              model-text="摘要"
              @update:model-value="handleExcerptToggle"
            />
          </div>
        </div>
      </template>
    </ProgressBarHeader>

    <!-- Posts grouped by year -->
    <div
      un-flex="~ col"
      un-items-end
      un-w-full
    >
      <div
        v-for="year in getAllYears(posts)"
        :key="year"
        un-py-10
        un-flex="~ col"
        un-gap-4
        un-w-full
      >
        <!-- Year display -->
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
          {{ toChineseNumber(year.toString()) }}
        </div>
        <!-- Individual post entry -->
        <div
          v-for="post in filteredPostsByYear(year)"
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
            <!-- Post creation date -->
            <div
              un-text="neutral-500 dark:neutral-400 base"
              un-mr-2
              un-whitespace-nowrap
            >
              {{ formatMonthDay(post.created.raw) }}
            </div>
            <!-- Post title with underline link and tooltip -->
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
                  un-py-2
                  un-flex="~ col"
                  un-text="sm neutral-600 dark:neutral-400"
                  un-gap-2
                >
                  <div
                    un-flex="~ row"
                    un-items-center
                    un-gap-2
                  >
                    <un-i-ph-clock-duotone
                      un-w-4
                      un-h-4
                      un-inline-block
                      un-align-middle
                      :class="post.readingTime < 5
                        ? `text-green-700 dark:text-green-300`
                        : post.readingTime < 10
                          ? `text-yellow-700 dark:text-yellow-300`
                          : `text-red-700 dark:text-red-300`"
                    />
                    <div>
                      {{ `约${post.readingTime.toString()}分钟` }}
                    </div>
                  </div>
                  <div
                    v-if="post.tags && post.tags.length > 0"
                    un-flex="~ row"
                    un-items-center
                    un-gap-2
                  >
                    <un-i-ph-tag-duotone
                      un-w-4
                      un-h-4
                      un-inline-block
                      un-align-middle
                      un-text="sky-400 dark:sky-600"
                    />
                    <div
                      v-for="tag in post.tags"
                      :key="tag"
                      un-text="sky-700 dark:sky-300"
                      un-underline
                    >
                      #{{ tag }}
                    </div>
                  </div>
                </div>
              </template>
            </LinkUnderline>
          </div>
          <!-- Post excerpt -->
          <div
            v-show="excerptVisible"
            un-text-neutral-500
            class="markdown-rendered"
            v-html="post.excerpt?.replace(/<p>|<\/p>/g, '')"
          />
        </div>
      </div>
    </div>

    <!-- Message when no posts are found -->
    <div
      v-if="props.posts.length === 0 && emptyMessage"
      un-text="2xl neutral-800 dark:neutral-200"
      un-my-10
      un-flex="~ row"
    >
      {{ emptyMessage }}
    </div>
    <slot
      v-if="props.posts.length === 0"
      name="empty-message-addons"
    />
  </un-page-content>
</template>
