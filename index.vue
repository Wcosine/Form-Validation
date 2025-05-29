<!--這是v1版本-->
<script setup>
import {ref, computed} from 'vue'
import RegisterForm from './RegisterForm.vue';
import LoginForm from './LoginForm.vue';


const mode = ref('login')
// 這是一個響應式變數
const modeComponent = computed(()=>{
  return mode.value === 'login' ? LoginForm : RegisterForm
})
// 透過computed計算, 當他的值是login或是register的時候變換顯示元件
// computed讓模板能自動追蹤變化

</script>

<template>
<div class="container-header">
  <h2>歡迎使用本頁面</h2>
  <div class="btn-group">
    <button @click="mode = 'login'" class="btn">我要登入</button>
    <button @click="mode = 'register'" class="btn">我要註冊</button>
  </div>
  <div class="container">
    <component :is="modeComponent"/>
  </div>
</div>
</template>

<style scoped>
.container-header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0 5rem;
}
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 2rem 5rem;
  margin-top: 1rem;
}
</style>
