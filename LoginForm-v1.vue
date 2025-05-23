<!-- 這是試錯版本 v1 -->

<script setup>
import FormInput from './FormInput.vue';
import { ref, defineEmits, computed } from 'vue';

const emit = defineEmits(['submitForm'])
// 定義我要使用的功能名稱

const email = ref('')
const password = ref('')
// 動態帶入我輸入的值

const isVaildEmail = (email) =>{
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // 用正規表達式（regex）驗證email的格式是否正確
  return pattern.test(email)
  //這是一個function, 要記得return才會回傳測試結果
}
const emailError = computed(()=>{
  if(email.value === '') return "請輸入電子郵件" 
  if(!isVaildEmail(email.value)) return "電子郵件格式錯誤" 
  // email.value會帶入function 的email
  return ''
  // 沒有錯誤訊息就是驗證通過
})

const passwordError = computed(()=>{
  if(password.value === '') return "請輸入密碼" 
  if(password.value.length < 6) return "密碼至少需6位數" 
  return ''
  // 沒有錯誤訊息就是驗證通過
})

const submitForm = () =>{
  if(emailError.value === '' && passwordError.value === ''){
  // 郵件或是密碼皆為'空值'的時候登入成功
    alert('登入成功')
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
