## 表單驗證小練習

主要目的是練習如何使用prop、emit、slot等操作方式製作表單驗證功能，

並且學習如何優化，使元件「模組化」提高維護性。

> 目前的檔案還有很多進步空間，若有前輩願意指教，歡迎留言交流，敬請多多指教！

---

## 功能說明

- 使用者可即時識別自己的密碼為高、中、低強度
- 自動檢查並提示密碼與確認密碼欄位是否一致
- 一鍵清空輸入欄位
- 提交後，提示輸入錯誤欄位並建議修改方向

---

## 檔案說明

* Version 1 為初版，尚未完整使用模組化開發，

  僅用了slot將表單輸入欄位封裝為可重用元件。

* Version 2 將驗證功能抽離為獨立模組，

  另外運用雙向綁定的方式將輸入欄位封裝為可重用元件。

### Version 1
```
Components
  - FormInput.vue

Views
  - LoginForm.vue
  - RegisterForm.vue

index.vue
```

### Version 2
```
Components
  - baseInput.vue
  - validation.js

Views
  - newLoginForm.vue
  - newRegisterForm.vue

index.vue
```
