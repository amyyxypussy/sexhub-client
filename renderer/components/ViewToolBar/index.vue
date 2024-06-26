<script setup lang="ts">
defineOptions({ name: 'ViewToolBar' })
withDefaults(
  defineProps<{ title?: string; gapWidth?: number; wrapStyle?: Record<string, any> }>(),
  {
    title: '',
    gapWidth: 0
  }
)
</script>

<template>
  <div class="h-14 w-full">
    <div class="h-14 w-full flex items-center justify-between">
      <slot name="title">
        <span class="text-primary">{{ title }}</span>
      </slot>

      <div class="flex"><slot></slot></div>
    </div>
  </div>
</template>
