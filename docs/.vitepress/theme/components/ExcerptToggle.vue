<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div
    un-flex="~ row"
    un-items-center
  >
    <input
      :id="id"
      v-model="isChecked"
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
      :for="id"
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
          :un-translate-y="isChecked ? '100%' : '0'"
          :un-opacity="isChecked ? '0' : '100'"
          un-absolute
        >
          隐藏
        </span>
        <span
          un-inline-block
          un-transition-all
          un-duration-400
          un-text="emerald-600 dark:emerald-400"
          :un-translate-y="isChecked ? '0' : '-100%'"
          :un-opacity="isChecked ? '100' : '0'"
        >
          显示
        </span>
      </div>
      摘要
    </label>
  </div>
</template>
