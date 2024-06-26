<script setup lang="ts">
import NavSearch from './NavSearch.vue'
import { useSettingStore } from '@/store/setting'

const settingStore = useSettingStore()

function miniWindow() {
  window.electron.send('mini-window')
}

function closeWindow() {
  window.electron.send('close-window')
}
</script>

<template>
  <div class="navbar drag relative w-full flex flex-shrink-0 items-center justify-between px-6">
    <div class="logo-wrap flex items-center">
      <div class="title pt-2 text-primary"><span>SEXHUB</span></div>
      <transition>
        <div class="ml-7" id="header-wrapper" v-show="settingStore.showNavTab"></div>
      </transition>
    </div>

    <NavSearch v-model:force="settingStore.searching"></NavSearch>

    <div class="operator-wrap flex items-center">
      <div class="mr-8 h-4 w-[2px] bg-gray-200"></div>
      <div class="no-drag opt-icon mr-6" @click="miniWindow">
        <div class="i-ant-design:minus-outlined text-[22px]"></div>
      </div>

      <div class="no-drag opt-icon" @click="closeWindow">
        <div class="i-ant-design:close-outlined text-[22px]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/variables.module';

.navbar {
  height: $navbarHeight;
  border-bottom: 1px solid rgba(217, 217, 217, 0.4);

  .title {
    span {
      font-size: 25px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
