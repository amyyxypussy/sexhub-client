<script setup lang="ts">
defineOptions({
  name: 'EmailVerifyCode'
})

const email = defineModel('email')
const verifyCode = defineModel('verifyCode')
</script>

<template>
  <a-form-item class="mb-2">
    <span text-xs>游戏</span>
    <a-input size="large" v-model:value="email"> </a-input>
  </a-form-item>

  <a-form-item class="mb-2" v-model:value="verifyCode">
    <span text-xs>验证码</span>
    <div class="flex items-center">
      <a-input size="large"> </a-input>

      <a-button class="ml-3" size="large">获取验证码</a-button>
    </div>
  </a-form-item>
</template>

<style scoped lang="scss"></style>
