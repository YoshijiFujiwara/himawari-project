<template>
  <v-row class="mb-6 full-height" no-gutters>
    <v-col cols="12" md="8">
      <v-row>
        <v-col class="ml-10 mt-10 mainText--text text-h4 font-weight-bold">
          <nuxt-link to="/">To Growth</nuxt-link>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-col cols="9" class="text-center">
          <v-img
            class="mx-auto mb-5"
            :src="require('@/assets/verify_complete.png')"
            max-width="400"
          />
          <p class="text-h5 font-weight-bold">
            アカウント登録を完了しました。
          </p>
          <p>
            HimawariHubにご登録いただき、ありがとうございました。<br />
            下記のボタンを押し、ログインすることができます。
          </p>
          <v-btn class="ma-2 mt-8" color="primary" to="/auth/signin">
            ログインページへ
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <!-- PCのみ -->
    <v-col v-show="_isPC" cols="12" md="4" class="yellowBg"></v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store'

export default Vue.extend({
  layout: 'guest/default',
  middleware: 'guest',
  async created() {
    // メールアドレス認証用トークン
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      this._startLoading()
      const { error, messages } = await authStore.confirmEmail(token)
      if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
        this.$router.push('/auth/signin')
      }
    } else {
      this._notifyyyy([
        {
          message: '不正な画面遷移です',
          type: 'warning'
        }
      ])
      this.$router.push('/auth/signin')
    }

    this._finishLoading()
  }
})
</script>
<style lang="scss" scoped>
.full-height {
  min-height: 100vh;
}
</style>
