import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

// 全てのルールをインポート
let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule], // eslint-disable-line
  })
}
// カスタムルール
extend('required', {
  message: '{_field_}を入力してください。'
})
extend('email', {
  message: 'メールアドレスの形式が正しくありません。'
})
extend('min', {
  message: '{length}文字以上で入力してください'
})
extend('max', {
  message: '{length}文字以内で入力してください'
})
// メッセージを日本語化
localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
