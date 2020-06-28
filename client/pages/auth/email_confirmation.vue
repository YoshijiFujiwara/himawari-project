<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',
  async created() {
    // メールアドレス認証用トークン
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      this.startLoading()
      const { error, messages } = await authStore.confirmEmail(token)
      this.finishLoading()
      if (!error) {
        this.notifyyyy([
          {
            message: 'メール確認が完了しました',
            type: 'success'
          }
        ])
      } else if (error && messages) {
        this.notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      }
    } else {
      this.notifyyyy([
        {
          message: '不正な画面遷移です',
          type: 'warning'
        }
      ])
    }
    this.$router.push('/auth/signin')
  }
})
</script>
