<!-- 配合baseInput.vue -->
<!-- 這是v1版本 -->

<script setup>
import baseInput from './baseInput.vue';
import {reactive} from 'vue';

const form = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
//這是儲存input欄位的資料

</script>

<template>
  <!-- 註 -->
  <baseInput v-model="form.name" label="使用者名稱" placeholder="請輸入英文及數字">
  </baseInput>
  <baseInput v-model="form.email" label="電子郵件" placeholder="example@gmail.com">
  </baseInput>
  <baseInput v-model="form.password" label="密碼" placeholder="至少6字">
  </baseInput>
  <baseInput v-model="form.passwordConfirm" label="確認密碼">
  </baseInput>
</template>

<!-- 
    #註
    1. 由於input才能使用v-model語法綁定值, 因此如果要使用在baseInput上,
       子組件需要加上:value顯示值並且@input回傳新值, 才能讓父組件更新
    2. label、placeholder是顯示給使用者看的
    3. v-model綁定子組件的modelValue, 實際上為「props + emit」的一套語法糖, 
       展開如下：
       <BaseInput
         :modelValue="form.name" //綁定值
         @update:modelValue="(newVal) => form.name = newVal"  //更新值
       />
-->
