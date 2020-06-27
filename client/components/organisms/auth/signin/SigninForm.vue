<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="form.usernameOrEmail"
      class="mt-10"
      label="ユーザ名またはメールアドレス"
      :rules="rules.usernameOrEmail"
      outlined
      required
    ></v-text-field>
    <v-text-field
      v-model="form.password"
      class="mt-7"
      label="パスワード"
      :type="showPasswordIcon ? 'text' : 'password'"
      :rules="rules.password"
      outlined
      required
      :append-icon="showPasswordIcon ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPasswordIcon = !showPasswordIcon"
    ></v-text-field>
    <p class="mt-5 mb-5">
      パスワードをお忘れの方はこちら
    </p>
    <v-btn block large color="primary" :disabled="!valid" @click="onSubmit"
      >ログイン</v-btn
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
import { buildApiUrl } from '@/store/utils'
import { authStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      valid: false,
      form: {
        usernameOrEmail: '',
        password: ''
      },
      rules: {
        usernameOrEmail: [
          (v: string) => !!v || 'ユーザー名またはパスワードは必須です'
        ],
        password: [(v: string) => !!v || 'パスワードは必須です']
      },
      showPasswordIcon: false
    }
  },
  methods: {
    isEmail(text: string) {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return reg.test(text)
    },
    async onSubmit() {
      const { usernameOrEmail, password } = this.form
      const [username, email] = this.isEmail(this.form.usernameOrEmail)
        ? [undefined, usernameOrEmail]
        : [usernameOrEmail, undefined]

      this.$vs.loading()
      const { error, messages } = await authStore.signin({
        username,
        email,
        password
      })
      this.$vs.loading.close()

      if (error && messages) {
        this.notify({
          messages,
          color: 'warning'
        })
      } else {
        this.notify({
          messages: ['ログインしました'],
          color: 'success'
        })
        this.$router.push('/profile')
      }
    },
    onClickGoogleButton() {
      const apiUrl = buildApiUrl()
      window.location.href = `${apiUrl}/api/auth/google`
    }
  }
})
</script>
