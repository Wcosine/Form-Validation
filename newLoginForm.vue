<script setup>
import Validation from './Validation.js';
import baseInput from './baseInput.vue';
import {ref} from 'vue'

const loginForm = ref({
  email:"",
  password:""
})

const {
  errors,
  validateEmail,
  validatePassword
} = Validation()

const successMessage = ref('')
const errorMessage = ref('')

const login = () =>{
  successMessage.value = ""
  errorMessage.value = ""
  
  const isValidateEmail = validateEmail(loginForm.value.email)
  const isValidatePassword = validatePassword(loginForm.value.password)
  // 因為物件是用ref包裝, 所以取值時需要用.value

  if(isValidateEmail && isValidatePassword){
    successMessage.value = "成功登入"
    loginForm.value.email = ""
    loginForm.value.password = ""

  } else if(!isValidateEmail || !isValidatePassword){
    errorMessage.value = "請填寫所有欄位"
  } else {
    errorMessage.value = "帳號或密碼錯誤"
  }
}

</script>

<template>
  <baseInput v-model="loginForm.email"
  :error= 'errors.email' label="電子郵件">
  </baseInput>
  <baseInput v-model="loginForm.password"
  :error= 'errors.password' label="密碼">
  </baseInput>
  <button type="submit" @click="login">登入</button>
  <p v-if="successMessage" style="color: green;" >{{successMessage}}</p>
  <p v-if="errorMessage" style="color: red;" >{{errorMessage}}</p>
</template>

