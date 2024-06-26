<script setup lang="ts">
import { viewRoutes } from '@/util/view'

const routes = inject(viewRoutes)
</script>

<template>
  <div class="main-content w-full">
    <scrollbar>
      <router-view v-slot="{ Component }">
        <fade-transition>
          <keep-alive :include="routes?.map((r) => r.routeName)">
            <component :is="Component"></component>
          </keep-alive>
        </fade-transition>
      </router-view>
    </scrollbar>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/variables.module';

.main-content {
  height: calc(100% - #{$navbarHeight});
}
</style>
