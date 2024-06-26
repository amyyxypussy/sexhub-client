<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    gridColsCls: string
    gapXCls?: string
    gapYCls?: string
    itemHeight: number
    loading?: boolean
    wrapCls?: string
    wrapHeight: number
    list?: any[]
  }>(),
  {
    gapXCls: 'gap-x-4',
    gapYCls: 'gap-y-4',
    loading: false
  }
)

const slots = defineSlots<{
  default(props: { entry: any[] }): any
  footer(): any
  empty(): any
}>()

const loadingTotal = computed(() => {
  const itemH = props.itemHeight + Number(props.gapYCls.match(/\d+/g)?.[0])
  return Math.ceil(props.wrapHeight / itemH) * Number(props.gridColsCls.match(/\d+/g)?.[0])
})

const resList = computed(() => {
  return props.loading ? new Array(loadingTotal.value).fill(undefined) : props.list || []
})
</script>

<template>
  <div class="h-fit w-full flex flex-col">
    <div
      v-if="resList.length && !!slots.default"
      class="grid h-fit w-full"
      :class="[gridColsCls, gapXCls, gapYCls, wrapCls]"
    >
      <slot v-for="item in resList" :entry="item"></slot>
    </div>

    <div class="h-full w-full" v-if="!resList.length">
      <slot name="empty"></slot>
    </div>

    <div class="h-fit w-full flex items-center justify-center">
      <slot name="footer" class="my-4"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
