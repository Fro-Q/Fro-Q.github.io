<script setup lang="ts">
import type { Data } from '../src/posts.data'
import { formatDate } from '@vueuse/core'
import { computed, ref } from 'vue'
import { formatMonthDay } from '../../utils/formatDate'
import { toChineseNumber } from '../../utils/toChineseNumber'
import CheckboxToggle from './CheckboxToggle.vue'
import LinkUnderline from './LinkUnderline.vue'
import ProgressBarHeader from './ProgressBarHeader.vue'

// TODO: Abstract this component

const props = defineProps<{
  /**
   * Posts to be displayed.
   */
  posts: Record<string, Record<string, Data[]>>
  /**
   * Titles mapping for each group.
   */
  groupTitleMapping?: Record<string, string>
  /**
   * Titles mapping for each subgroup.
   */
  subGroupTitleMapping?: Record<string, string>
  /**
   * Boolean to control the visibility of the excerpt toggle.
   */
  showExcerptToggle?: boolean
  /**
   * Boolean to control the visibility of the title.
   */
  showTitle?: boolean
  /**
   * Function to format the date.
   */
  dateFormatter?: (date: Date) => string
}>()

const posts = computed(() => {
  // Map group titles and subgroup titles if provided
  return Object.fromEntries(
    Object.entries(props.posts).map(([group, posts]) => [
      props.groupTitleMapping?.[group] || group,
      Object.fromEntries(
        Object.entries(posts).map(([subgroup, posts]) => [
          props.subGroupTitleMapping?.[subgroup] || subgroup,
          posts,
        ]),
      ),
    ]),
  )
})

const excerptVisible = ref(Object.fromEntries(Object.keys(posts).map(group => [group, false])))
</script>

<template>
  <un-page-content
    v-for="[group, groupedPosts] in Object.entries(posts)"
    :key="group"
    un-min-h-100vh
  >
    <ProgressBarHeader
      v-if="showTitle"
      :id="group"
      :title="group"
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
              :id="`${group}-excerpt`"
              :model-value="excerptVisible[group]"
              model-text="摘要"
              @update:model-value="excerptVisible[group] = $event"
            />
          </div>
        </div>
      </template>
    </ProgressBarHeader>

    <div
      un-flex="~ col"
      un-items-end
      un-w-full
    >
      <div
        v-for="[subGroup, subGroupedPosts] in Object.entries(groupedPosts)"
        :key="subGroup"
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
          {{ subGroup !== '-' ? subGroup : '' }}
        </div>
        <div
          v-for="post in subGroupedPosts"
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
              {{ dateFormatter
                ? dateFormatter(post.created) : new Date(post.created).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) }}
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
            v-show="excerptVisible[group] && post.excerpt"
            un-text-neutral-500
            class="markdown-rendered"
            v-html="post.excerpt?.replace(/<p>|<\/p>/g, '')"
          />
        </div>
      </div>
    </div>

    <slot
      :name="`empty-message-addons-${group}`"
    />
  </un-page-content>
</template>
