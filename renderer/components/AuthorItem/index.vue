<script setup lang="ts">
import { fallbackImg, resolveStaticResourceUrl } from '@/util/helper.ts'
import { Author } from '@/apis/author'

const emit = defineEmits(['click'])

defineProps<{
  loading?: boolean
  imageRate?: number
  entry?: Author
}>()
</script>

<template>
  <div class="h-[145px] w-full" @click="emit('click', entry)">
    <div v-if="!entry" class="h-full w-full">
      <div class="loading-wrap aspect-[1/1.1] w-full"></div>

      <div class="loading-wrap mt-3 h-6 w-full"></div>
    </div>

    <div class="flex flex-col cursor-pointer" v-else>
      <a-image
        class="aspect-[1/1.1] rounded"
        width="100%"
        :fallback="fallbackImg"
        :preview="false"
        :src="resolveStaticResourceUrl(entry.avatarPath)"
      />

      <div
        class="mt-3 items-center justify-center truncate px-1 text-center text-[14px] text-regular"
      >
        {{ entry.name }}
      </div>
    </div>
  </div>
</template>
