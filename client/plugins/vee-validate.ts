import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import { required, email, min, max } from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

extend('required', {
  ...required,
  message: '{_field_}を入力してください。'
})
extend('email', {
  ...email,
  message: 'メールアドレスの形式が正しくありません。'
})
extend('min', {
  ...min,
  message: '{length}文字以上で入力してください'
})
extend('max', {
  ...max,
  message: '{length}文字以内で入力してください'
})
// メッセージを日本語化
localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
