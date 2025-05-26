<!-- 這是v2版本 -->

<script setup>
import {ref} from 'vue'
import FormInput from './FormInput.vue';

const userName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const userNameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const passwordConfirmError = ref('')

const isVaildEmail = (email) =>{
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // 用正規表達式（regex）驗證email的格式是否正確
  return pattern.test(email)
  //這是一個function, 要記得return才會回傳測試結果
}
const isEnglishOnly = (text) => {
  const pattern = /^[A-Za-z0-9]+$/
  return pattern.test(text)
}

// 將驗證邏輯分離更好維護
const validateUser = () =>{
  if(userName.value === ""){
    userNameError.value = "請輸入使用者名稱"
  } else if(userName.value.length < 5 ){
    userNameError.value = '使用者名稱至少5字'
  } else if(isEnglishOnly(userName.value)){
    userNameError.value = '使用者名稱僅能為英文字母及數字'
  } else {
    userNameError.value = ""
  }
}
const validateEmail = () =>{
  if(email.value === ""){
    emailError.value = "請輸入郵件"
  } else if(!isVaildEmail(email.value)){
    emailError.value = '請輸入正確格式'
  } else {
    emailError.value = ""
  }
}
const validatePassword = () =>{
  if(password.value === ""){
    passwordError.value = "請輸入密碼"
  } else if(password.value.length < 6){
    passwordError.value = '密碼長度至少6字'
  } else {
    passwordError.value = ""
  }
}
const validatePasswordConfirm = () =>{
  if(password.value === ""){
    passwordConfirmError.value = "再次輸入密碼"
  } else if (passwordConfirm.value !== password.value){
    passwordConfirmError.value = "請確認密碼是否一致"
  } else {
    passwordConfirmError.value = ""
  }
}

const confirmRegister = () =>{
  validateUser()
  validateEmail()
  validatePassword()
  validatePasswordConfirm()
  if(userNameError.value === "" &&
     emailError.value === "" && 
     passwordError.value === "" &&
     passwordConfirmError.value === "" 
     ){
    alert ('成功註冊') 
    reset()
  }
}
const reset = () =>{
  userName.value = ""
  email.value = ""
  password.value = ""
  passwordConfirm.value = ""
  userNameError.value = ""
  emailError.value = ""
  passwordError.value = ""
  passwordConfirmError.value = ""
}

</script>

<template>
  <h2>使用者註冊</h2>  
  <FormInput>
    <template #userName>
      <label class="register-item"> 使用者名稱 <input type="text"  placeholder="僅能輸入英文及數字" 
      v-model="userName" @input="userName = userName.replace(/[^A-Za-z0-9]/g, '')"/></label>
      <!-- 控制輸入的內容僅能為英文及數字, 註1 -->
      <p v-if="userNameError" style="color:red">{{userNameError}}</p>
    </template>
    <template #email>
      <label class="register-item"> 電子郵件 <input type="email" v-model="email"/></label>
      <p v-if="emailError" style="color:red">{{emailError}}</p>
    </template>
    <template #password>
      <label class="register-item"> 密碼 <input type="password" v-model="password"/></label>
      <p v-if="passwordError" style="color:red">{{passwordError}}</p>
    </template>
    <template #confirmPassword>
      <label class="register-item"> 確認密碼 <input type="password" v-model="passwordConfirm"/></label>
      <p v-if="passwordConfirmError" style="color:red">{{passwordConfirmError}}</p>
    </template>
    <template #footer>
      <button @click="confirmRegister">確認註冊</button>
      <button @click="reset">重新填寫</button>
    </template> 
  </FormInput> 
</template>

<!--
    #補充說明
    1. /[^A-Za-z0-9]/g 是正規表達式, "^"表示非, 這裡指非英文及數字的內容, "/g"代表 global（全域搜尋）, 逗號後的''表示替換成空
-->
