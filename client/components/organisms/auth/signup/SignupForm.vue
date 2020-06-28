<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="form.username"
      class="mt-10"
      label="ユーザ名"
      :rules="rules.username"
      :counter="20"
      outlined
      required
    ></v-text-field>
    <v-text-field
      v-model="form.email"
      class="mt-7"
      label="メールアドレス"
      :rules="rules.email"
      outlined
      required
    ></v-text-field>
    <v-text-field
      v-model="form.password"
      class="mt-7"
      label="パスワード"
      :type="showPasswordIcon ? 'text' : 'password'"
      :rules="rules.password"
      :counter="20"
      outlined
      required
      :append-icon="showPasswordIcon ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPasswordIcon = !showPasswordIcon"
    ></v-text-field>
    <v-checkbox v-model="form.isAgreed" class="mb-1">
      <span slot="label">利用規約に同意します</span>
    </v-checkbox>
    <v-btn
      block
      large
      color="primary"
      :disabled="!valid || !form.isAgreed"
      @click="onSubmit"
      >アカウントを作成</v-btn
    >
    <v-divider class="mt-10 mb-10"></v-divider>
    <v-btn
      block
      large
      color="googleBtn"
      class="white--text"
      @click="onClickGoogleButton"
      >Googleアカウントでログイン</v-btn
    >
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store'
import { buildApiUrl } from '@/store/utils'

export default Vue.extend({
  data() {
    return {
      valid: false,
      form: {
        username: '',
        email: '',
        password: '',
        isAgreed: false
      },
      rules: {
        username: [
          (v: string) => !!v || 'ユーザー名は必須です',
          (v: string) =>
            (v && v.length <= 20) || 'ユーザー名は20文字以内で入力してください',
          (v: string) =>
            (v && v.length >= 5) || 'ユーザー名は5文字以上で入力してください'
        ],
        email: [
          (v: string) => !!v || 'メールアドレスは必須です',
          (v: string) =>
            /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません'
        ],
        password: [
          (v: string) => !!v || 'パスワードは必須です',
          (v: string) =>
            (v && v.length <= 20) || 'パスワードは20文字以内で入力してください',
          (v: string) =>
            (v && v.length >= 6) || 'パスワードは6文字以上で入力してください'
        ]
      },
      showPasswordIcon: false
    }
  },
  methods: {
    async onSubmit() {
      this.startLoading()
      const { error, messages } = await authStore.signup(this.form)
      this.finishLoading()

      if (!error) {
        this.$router.push('/auth/mailsend')
      } else if (error && messages) {
        this.notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      }
    },
    onClickGoogleButton() {
      const apiUrl = buildApiUrl()

      window.location.href = `${apiUrl}/api/auth/google`
    }
  }
})
</script>
