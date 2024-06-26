<script setup lang="ts">
defineOptions({
  name: 'EmptyComp'
})
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <slot />
  </div>
</template>
