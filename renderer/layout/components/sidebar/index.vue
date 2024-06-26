<script setup lang="ts">
import { sidebarBottom, sidebarTop } from '@/util/view'

const route = useRoute()
const router = useRouter()

const sidebarTopRoutes = inject(sidebarTop)
const sidebarBottomRoutes = inject(sidebarBottom)
</script>

<template>
  <div class="sidebar drag flex flex-col items-center justify-between">
    <div class="h-fit w-full flex flex-col items-center">
      <div class="back w-full flex items-center justify-center">
        <div
          class="no-drag mt-2 flex cursor-pointer rounded-lg p-1 text-secondary hover:bg-zinc-200"
          @click="router.back()"
        >
          <div class="i-ic:baseline-keyboard-arrow-left text-2xl"></div>
        </div>
      </div>

      <div
        v-for="item in sidebarTopRoutes"
        :key="item.routePath"
        class="no-drag sidebar-top-item-wrap text-secondary"
        :class="{ '!text-primary': route.meta.space === item.space }"
      >
        <Component :is="item.title" />
      </div>
    </div>

    <div class="mb-1 flex flex-col items-center text-secondary">
      <div
        v-for="item in sidebarBottomRoutes"
        :key="item.routePath"
        class="no-drag sidebar-bottom-item-wrap mb-7 cursor-pointer text-[24px]"
        :class="{ '!text-primary': route.meta.space === item.space }"
        @click="router.push(item.routePath)"
      >
        <Component :is="item.title" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/style/variables.module';
.sidebar {
  @apply flex h-full flex-col items-center justify-between bg-[#f6f7f8];
  width: $sideBarWidth;

  .back {
    height: $navbarHeight;
  }
}

.sidebar-top-item-wrap {
  div {
    @apply text-[22px];
  }
  span {
    @apply mt-1.5 text-xs;
  }
}

.sidebar-bottom-item-wrap {
  div {
    @apply text-2xl;
  }
}
</style>
