<script setup lang="ts">
import Sidebar from '@/layout/components/sidebar/index.vue'
import Navbar from '@/layout/components/navbar/index.vue'
import MainContent from '@/layout/components/MainContent.vue'

defineOptions({
  name: 'Layout'
})
</script>

<template>
  <div class="h-full w-full flex">
    <Sidebar></Sidebar>

    <div class="main-container">
      <Navbar></Navbar>
      <MainContent></MainContent>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/variables.module';

.main-container {
  @apply h-full;
  width: calc(100% - #{$sideBarWidth});
}
</style>
