<template>
  <div>
    <!-- スマホのみ -->
    <v-row v-show="_isSP" justify="start">
      <p class="ml-6 text-h4 primary--text font-weight-bold">
        <nuxt-link to="/">To Growth</nuxt-link>
      </p>
    </v-row>
    <!-- PCのみ -->
    <v-row v-show="_isPC" justify="start"> </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <p class="mt-14 text-h4 font-weight-bold">パスワードを忘れた場合</p>
        <p class="mt-4">
          ユーザーアカウントの確認済みメールアドレスを入力してください。<br />
          パスワードリセットリンクが送信されます。
        </p>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="form.email"
            class="mt-7"
            label="メールアドレス"
            :rules="rules.email"
            outlined
            required
          ></v-text-field>
          <v-btn large color="primary" :disabled="!valid" @click="onSubmit"
            >パスワード再設定メールを送信する</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
    <!-- スマホのみ -->
    <v-row v-show="_isSP" justify="center" align="end" class="mt-10">
      <p>
        アカウントをお持ちでない方は<nuxt-link to="/auth/signup"
          >こちら</nuxt-link
        >
      </p>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      valid: false,
      form: {
        email: ''
      },
      rules: {
        email: [
          (v: string) => !!v || 'メールアドレスは必須です',
          (v: string) =>
            /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません'
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      alert('me-rukakuninsiro')
    }
  },
  layout: 'guest/signin',
  middleware: 'guest'
})
</script>
