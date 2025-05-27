<!-- v1版本 -->

<script setup>
// type your script here
</script>

<template>
  <div class="register-list">
    <div class="register-item">
      <slot name="userName"></slot>
    </div>
    <div class="register-item">
      <slot name="email"></slot>
    </div>
    <div class="register-item">
      <slot name="password"></slot>
    </div>
    <div class="register-item">
      <slot name="confirmPassword"></slot>
    </div>
  </div>
  <div class="btn">
    <slot name="footer">
      <button>按鈕</button>
    </slot>
  </div>
</template>

<style scoped>
.register-item{
  margin-bottom: 1rem;
}
.btn{
  display: inline-block;
  vertical-align: top;
  margin-top: 1rem;
}
</style>
