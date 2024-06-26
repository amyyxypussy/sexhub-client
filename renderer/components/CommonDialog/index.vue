<script setup lang="ts">
defineSlots<{
  default(props: Record<string, any>): any
}>()

const dialogStore = useDialogStore()

function closeWindow() {
  dialogStore.closeWindow()
}
</script>

<template>
  <div class="h-full w-full flex flex-col pb-4">
    <header class="drag flex-shrink-0 pb-4 pl-4 pr-8 pt-4">
      <div class="h-6 w-full text-[18px]">{{ dialogStore.title }}</div>

      <div class="absolute right-0 top-0 h-12 w-12 flex items-center justify-center">
        <div class="no-drag opt-icon" @click="closeWindow">
          <div class="i-ant-design:close-outlined text-[19px]"></div>
        </div>
      </div>
    </header>

    <section class="flex-1 px-4">
      <slot />
    </section>

    <footer class="px-4 pt-4">
      <div id="dialog-footer-container" class="footer-container"></div>
    </footer>
  </div>
</template>
