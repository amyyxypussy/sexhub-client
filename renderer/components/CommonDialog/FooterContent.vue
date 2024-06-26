<script setup lang="ts">
const mounted = ref(false)
const loading = ref(false)

const dialogStore = useDialogStore()

withDefaults(defineProps<{ showCancelBtn?: boolean; showConfirmBtn?: boolean }>(), {
  showCancelBtn: true,
  showConfirmBtn: true
})

const emit = defineEmits<{
  confirm: [callback: (func: Function) => void]
}>()

onMounted(function () {
  mounted.value = true
})

onUnmounted(function () {
  mounted.value = false
})

function cancel() {
  window.electron.send('close-window')
}

function confirm() {
  loading.value = true
  emit('confirm', async function confirmCallback(func: Function) {
    try {
      const result = await func()
      dialogStore.closeWindow(result)
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <teleport to="#dialog-footer-container" v-if="mounted">
    <div class="h-fit w-full">
      <div class="w-full flex justify-end">
        <slot class="ml-4" :closeFn="cancel" />
        <a-button class="ml-4" v-if="showCancelBtn" @click="cancel">取消</a-button>
        <a-button
          type="primary"
          class="ml-4"
          v-if="showConfirmBtn"
          @click="confirm"
          :loading="loading"
          >确定</a-button
        >
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss"></style>
