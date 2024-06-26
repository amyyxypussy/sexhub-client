<script setup lang="ts">
const text = ref<string>('')
const textInput = ref<HTMLInputElement>()

defineProps<{ force: boolean }>()
const emit = defineEmits(['update:force', 'search'])

const focus = () => {
  emit('update:force', true)
}

const blur = () => {
  emit('update:force', text.value !== '')
}

const outClick = () => {
  textInput.value?.focus()
}

const customClick = () => {
  emit('search', text.value)
}
</script>

<template>
  <div
    class="nav-search-wrap no-drag flex items-center justify-between rounded bg-[#f1f2f3] pl-2 pr-3 hover:bg-[#e3e5e7]"
    :class="{ force: force }"
    @click="outClick"
  >
    <input
      v-model="text"
      ref="textInput"
      class="border-none bg-none pt-0.5 text-zinc-900 caret-primary outline-none"
      type="text"
      placeholder="搜索你感兴趣的视频"
      @focus="focus"
      @blur="blur"
    />

    <div class="i-lucide:search cursor-pointer text-lg text-secondary" @click="customClick"></div>
  </div>
</template>

<style scoped lang="scss">
.nav-search-wrap {
  transition:
    right 200ms,
    width 200ms,
    border 200ms,
    background 200ms;
  top: 50%;
  position: absolute;
  width: 300px;
  height: 37px;
  right: 330px;
  transform: translate3d(50%, -50%, 0);
  border: 1px solid transparent;
  cursor: text;

  &.force {
    @apply border border-primary bg-white;
    width: 460px;
    right: 50%;

    &:hover {
      @apply bg-white;
    }
  }

  input {
    width: 100%;
    background: transparent;
    outline: none;
    font-size: 13px;
    font-weight: 500;
    line-height: 15px;
  }

  input {
    &::placeholder {
      @apply text-[#94a6c0];
      font-size: 13px;
      line-height: 14px;
    }
  }
}
</style>
