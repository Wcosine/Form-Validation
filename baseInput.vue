<!-- 這個是將input欄位獨立為元件的檔案, 且不使用slot的製作方式 -->
<!-- 這是v2版本, 配合newRegiterForm.vue -->

<script setup>
import {defineProps, defineEmits} from 'vue'
const prop = defineProps({
  label: String,
  placeholder: String,
  type:{
    type: String,
    default: 'text',
  },
  modelValue: String,
  error: String
  // 這個是儲存顯示錯誤訊息的值
})
// 由父組件控制值

const emit = defineEmits(["update:modelValue"])
// 這個emit目的是發出事件給父組件知道要更新
const updateValue = (e) =>{
  // e只是一個變數值, 可以自定義, e通常是event的縮寫
  emit("update:modelValue", e.target.value)
}

</script>

<template>
  <label class="inputItem" >
    {{label}}
    <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"/>
    <!--當有input資料更新的時候觸發emit-->
    <p v-if="error" class="error">{{error}}</p>
    <!-- 當error有值就顯示 -->
  </label>
</template>

<style scoped>
.inputItem{
  display: flex;
  margin: 1rem;
  background-color: #ccc;
}
input{
  margin-left: 12px;
}
</style>
