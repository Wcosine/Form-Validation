// 這是一個composable 的寫法, 這個檔案主要處理驗證邏輯

import {ref} from 'vue';
// 因為有import這段, 所以可以使用vue Composition API功能

export default function useValidation(){
  // 這是將函式導出的寫法, 可供其他檔案引入使用

  const errors = ref({
    name:"",
    email:"",
    password:"",
    passwordConfirm:""
  })

  const validateName = (name) =>{
    if(!name) {
      errors.value.name = "請輸入使用者名稱"
      return false
    }
    const valid = /^[a-zA-Z0-9]+$/.test(name)
    errors.value.name = name ? "": "名稱須包含英文及數字"
    return valid
  } 
  const validateEmail = (email) => {
    if(!email) {
      errors.value.email = "請輸入郵件"
      return false
    } 
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    errors.value.email = valid ? "":"請輸入正確格式"
    // errors.value.email透過vaild驗證通過與否, 回傳"空"或是錯誤訊息
    return valid
  }
  const validatePassword = (psw) =>{
    if(!psw) {
      errors.value.password = "請輸入密碼"
      return false
    }
    if(psw.length < 6) {
      errors.value.password = "密碼長度需至少 6 碼"
      return false
    }
      errors.value.password = ""
      return true
    }
  const validatePasswordConfirm = (pswConfirm) =>{
    if(!pswConfirm) {
      errors.value.passwordConfirm = "請確認密碼是否一致"
      return false
    }
      errors.value.passwordConfirm = ""
      return true
    }

  return {
    errors,
    validateName,
    validateEmail,
    validatePassword,
    validatePasswordConfirm
  }
  // 這裡是回傳物件, 要用在父組件當中
}
