<script setup lang="ts">
import contacts from '../src/contacts.json' assert { type: 'json' }
</script>

<template>
  <un-page-content>
    <div
      un-my-10
      un-text="5xl/relaxed"
      un-font-serif
      un-max-w-full
    >
      Contact Moi
    </div>
    <div
      v-for="contact in contacts"
      :key="contact.title"
      un-inline-block
      un-font-mono
    >
      <div
        un-flex="~ row wrap"
        un-items-center
        un-justify-start
        un-p="x-2 y-1"
        un-m-1
        un-rounded-sm
        un-transition-colors
        un-duration-200
        un-border
        :class="`border-${contact.colorUno}-500`"
        :title="contact.title"
      >
        <div
          :class="`${contact.iconUno} text-${contact.colorUno}-500`"
          un-w-6
          un-h-6
          un-mr-2
        />
        <div
          v-for="link in contact.links"
          :key="link.link"
        >
          <a
            :href="link.link ? link.link : undefined"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code
              :class="`hover:text-${contact.colorUno}-500`"
            >
              {{ link.text }}
            </code>
          </a>
          <span
            v-if="link !== contact.links[contact.links.length - 1]"
            un-text="neutral-500"
            un-mx-1
          >//
          </span>
        </div>
      </div>
    </div>
  </un-page-content>
</template>
