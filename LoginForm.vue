<!-- 這是v2版本 -->
<!-- v1版本會及時跳出錯誤訊息, 使用者體驗感官較不友善 -->

<script setup>
import FormInput from './FormInput.vue';
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['submitForm'])
// 定義我要使用的功能名稱

const email = ref('')
const password = ref('')
// 動態帶入我輸入的值
const emailError = ref('')
const passwordError = ref('')

const isVaildEmail = (email) =>{
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // 用正規表達式（regex）驗證email的格式是否正確
  return pattern.test(email)
  //這是一個function, 要記得return才會回傳測試結果
}

const submitForm = () =>{
  emailError.value = ''
  passwordError.value = ''
  // 將先前填寫錯誤的訊息清空, 才不會導致錯誤
  
  if(email.value === ''){
    emailError.value = '請輸入郵件'
  } else if(!isVaildEmail(email.value)){
    emailError.value = '請輸入正確格式'
  }
  if(password.value === ''){
    passwordError.value = '請輸入密碼'
  } else if(password.value.length < 6){
    passwordError.value = '密碼長度至少6字'
  }
  if(emailError.value === '' && passwordError.value === ''){
    alert ('登入成功')
    email.value = ''
    password.value = ''
  }
}
</script>

<template>
  <h2>使用者登入</h2>  
    <FormInput>

        <template #email>
          <label class="register-item"> 電子郵件 <input type="email" v-model="email"/>  </label>  <!--補充說明1-->
          <p v-if="emailError" style="color:red">{{emailError}}</p>  <!--補充說明2-->
        </template>

        <template #password>
          <label class="register-item"> 密碼 <input type="password" v-model="password"/>  </label>
          <p v-if="passwordError" style="color:red">{{passwordError}}</p>
        </template>

        <template #footer>
          <button @click="submitForm">登入</button>
        </template> 

    </FormInput> 
</template>

<!--
    # 補充說明：
     1. v-model綁定ref, 紀錄輸入的資料
     2. 如果emailError有return的值, 會馬上顯示紅字 {{ 錯誤訊息 }}
-->
