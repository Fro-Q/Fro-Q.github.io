<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'

const props = defineProps<{
  href: string
  text: string
  tooltip?: boolean
  tooltipAddons?: string[]
  tooltipText?: string
}>()

const showTooltip = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const tooltipStyle = reactive({
  left: '0px',
  top: '0px',
})

async function updateTooltipPosition(e: MouseEvent) {
  if (!props.tooltip) {
    return
  }

  mouseX.value = e.clientX
  mouseY.value = e.clientY

  if (showTooltip.value) {
    await nextTick()
    if (tooltipRef.value) {
      const tooltipWidth = tooltipRef.value.offsetWidth
      const tooltipHeight = tooltipRef.value.offsetHeight
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let newLeft = mouseX.value + 10
      let newTop = mouseY.value + 10

      // Check if tooltip goes off right edge
      if (newLeft + tooltipWidth > viewportWidth) {
        newLeft = mouseX.value - tooltipWidth - 10
      }

      // Check if tooltip goes off bottom edge
      if (newTop + tooltipHeight > viewportHeight) {
        newTop = mouseY.value - tooltipHeight - 10
      }

      tooltipStyle.left = `${newLeft}px`
      tooltipStyle.top = `${newTop}px`
    }
  }
}

onMounted(() => {
  document.addEventListener('scroll', () => showTooltip.value = false)
})
</script>

<template>
  <div
    un-min-w-0
    un-inline-block
    un-duration-400
    un-relative
    un-px-2
    un-after="content-empty bg-neutral-200 dark:bg-neutral-800 w-full h-2px absolute bottom-0 left-0 z-0"
    un-before-w-0
    un-before-h-3px
    un-before-left-0
    un-before-bottom-0
    un-before-z-1
    un-before-rounded-none
    un-before-absolute
    un-hover-before-w-full
    un-before-transition-width
    un-before-content-empty
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    @mousemove="showTooltip = true; updateTooltipPosition($event)"
  >
    <a
      un-block
      un-max-w-full
      un-whitespace-nowrap
      un-text-ellipsis
      un-overflow-hidden
      :href="href"
    >
      {{ text }}
    </a>
    <div
      v-if="showTooltip && tooltip"
      ref="tooltipRef"
      class="tooltip"
      :style="tooltipStyle"
      un-text-align-start
      un-text-base
      un-fixed
      un-z-50
      un-bg="neutral-200 dark:neutral-800"
      un-text-white
      un-py-2
      un-px-4
      un-rounded-sm
      un-shadow-lg
      un-whitespace-nowrap
    >
      <div
        un-flex="~ col"
      >
        <div>
          {{ tooltipText }}
        </div>
        <slot
          name="tooltipAddons"
        />
      </div>
    </div>
  </div>
</template>
