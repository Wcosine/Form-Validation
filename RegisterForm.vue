<!-- 這是v4版本 -->

<script setup>
import {ref, reactive} from 'vue'
import FormInput from './FormInput.vue';

// 將之前的ref簡化成reactive物件操控
const checkPasswordStrength = ref('')
const form = reactive({
  userName: '',email: '',password: '',passwordConfirm: ''
})
const error = reactive({
  userNameError: '',emailError: '',passwordError: '',passwordConfirmError: ''
})

// 設定驗證條件
const isVaildEmail = (email) =>{
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // 用正規表達式（regex）驗證email的格式是否正確
  return pattern.test(email)
  // 這是一個function, 要記得return才會回傳測試結果
}
const isEnglishOnly = (text) => {
  const pattern = /^[A-Za-z]+$/
  return pattern.test(text)
}
// 設定驗證條件結束

// 設定密碼強度條件
const isStrongPassword = (pwd) =>{
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
  // "/^"意思是開頭, 在[]內的^ 則是代表"非"
  // "$"意思是結尾, {8,}長度至少8個字元
  return pattern.test(pwd)
  // 沒有return 會回傳undefined
}
const isMediumPassword = (pwd) =>{
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
  return pattern.test(pwd)
  // 沒有return 會回傳undefined
}
const PasswordStrength = () =>{
  if(isStrongPassword(form.password)){
    checkPasswordStrength.value = "高強度密碼"
  } else if (isMediumPassword(form.password)){
    checkPasswordStrength.value = "中強度密碼"
  } else {
    checkPasswordStrength.value = "強度不足"
  }
}
// 設定密碼強度條件結束

// 設定驗證錯誤顯示訊息
// 將驗證邏輯分離更好維護
const validateUser = () =>{
  if(form.userName === ""){
    error.userNameError = "請輸入使用者名稱"
  } else if(form.userName.length < 5 ){
    error.userNameError = '使用者名稱至少5字'
  } else if(isEnglishOnly(form.userName)){
    error.userNameError = '使用者名稱僅能為英文字母'
  } else {
    error.userNameError = ""
  }
}
const validateEmail = () =>{
  if(form.email === ""){
    error.emailError = "請輸入郵件"
  } else if(!isVaildEmail(form.email)){
    error.emailError = '請輸入正確格式'
  } else {
    error.emailError = ""
  }
}
const validatePassword = () =>{
  if(form.password === ""){
    error.passwordError = "請輸入密碼"
  } else if(form.password.length < 6){
    error.passwordError = '密碼長度至少6字'
  } else {
    error.passwordError = ""
  }
}
const validatePasswordConfirm = () =>{
  if(form.password === ""){
    error.passwordConfirmError = "再次輸入密碼"
  } else if (form.passwordConfirm !== form.password){
    error.passwordConfirmError = "請確認密碼是否一致"
  } else {
    error.passwordConfirmError = ""   // 清空錯誤值
    PasswordStrength()   // 執行強度判斷
  }
}
// 設定驗證錯誤顯示訊息結束

const confirmRegister = () =>{
  validateUser()
  validateEmail()
  validatePassword()
  validatePasswordConfirm()
  if(error.userNameError === "" &&
     error.emailError === "" && 
     error.passwordError === "" &&
     error.passwordConfirmError === "" 
     ){
    alert ('成功註冊') 
    reset()
  }
}
const reset = () =>{
  form.userName = ""
  form.email = ""
  form.password = ""
  form.passwordConfirm = ""
  error.userNameError= ""
  error.emailError= ""
  error.passwordError= ""
  error.passwordConfirmError= ""
}

</script>

<template>
  <h2>使用者註冊</h2>  
  <FormInput>
    <template #userName>
      <label class="register-item">
        使用者名稱
        <input type="text"  placeholder="須包含英文及數字" 
        v-model="form.userName" @input="form.userName = form.userName.replace(/[^A-Za-z0-9]/g, '')"/>
        <!-- .replace 置換 -->
      </label>
      <!-- 控制輸入的內容僅能為英文及數字, 註1 -->
      <p v-if="error.userNameError" style="color:red">{{error.userNameError}}</p>
    </template>
    <template #email>
      <label class="register-item"> 電子郵件 <input type="email" v-model="form.email"/></label>
      <p v-if="error.emailError" style="color:red">{{error.emailError}}</p>
    </template>
    <template #password>
      <label class="register-item">
        密碼
        <input type="password" v-model="form.password" @input="PasswordStrength"/>
        <!-- @input 當我觸發input事件的時候, 即時更新條件結果 -->
        </label>
      <p v-if="error.passwordError" style="color:red">{{error.passwordError}}</p>
      <p v-if="checkPasswordStrength" style="color:#ccc">{{checkPasswordStrength}}</p>
    </template>
    <template #confirmPassword>
      <label class="register-item">
        確認密碼
        <input type="password" v-model="form.passwordConfirm" @input="validatePasswordConfirm"/>
        </label>
      <p v-if="error.passwordConfirmError" style="color:red">{{error.passwordConfirmError}}</p>
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
