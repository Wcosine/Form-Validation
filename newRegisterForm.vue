<!-- 配合baseInput.vue -->
<!-- 配合Validation.js -->
<!-- 這是v2版本 -->

<script setup>
import baseInput from './baseInput.vue';
import Validation from './Validation.js' // 這是被導入用於驗證的功能包
import {reactive, ref} from 'vue';

const form = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
//這是儲存input欄位的資料

const {
  errors,
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm
} = Validation()
// Validation()是一個函式, 回傳多個驗證函式物件
// const{...}則是把函式物件取出傳入資訊使用

const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = () => {
  successMessage.value = ''
  errorMessage.value = ''
  
  const isNameValid = validateName(form.name)
  const isEmailValid = validateEmail(form.email)
  const isPasswordValid = validatePassword(form.password)
  const isPasswordConfirmValid = validatePasswordConfirm(form.passwordConfirm)
  // 這裡即是傳入函數物件的用法, isNameValid就是儲存驗證結果的變數, 值為布林值
  // 宣告變數, 值為form.name使用Validation驗證後結果

  if(isNameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid){
    successMessage.value = '成功註冊'
  } else{
    errorMessage.value = '請修正錯誤欄位'
  }
}
// 

</script>

<template>
  <!-- 註 -->
  <baseInput v-model="form.name" label="使用者名稱" placeholder="請輸入英文及數字"
  :error="errors.name">
  </baseInput>
  <baseInput v-model="form.email" label="電子郵件" placeholder="example@gmail.com"
  :error="errors.email">
  </baseInput>
  <baseInput v-model="form.password" label="密碼" placeholder="至少6字"
  :error="errors.password">
  </baseInput>
  <baseInput v-model="form.passwordConfirm" label="確認密碼"
  :error="errors.passwordConfirm">
  </baseInput>
  <button type="submit" @click="handleSubmit">提交註冊</button>
  <p v-if="successMessage" style="color: green;">{{successMessage}}</p>
  <p v-if="errorMessage" style="color: red">{{errorMessage}}</p>
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
