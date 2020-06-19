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
      this.$vs.loading()
      const { error, messages } = await authStore.confirmEmail(token)
      this.$vs.loading.close()
      if (!error) {
        this.notify({
          messages: ['メール確認が完了しました']
        })
      } else if (error && messages) {
        this.notify({
          messages,
          color: 'warning'
        })
      }
    } else {
      this.notify({
        messages: ['不正な画面遷移です'],
        color: 'warning'
      })
    }
    this.$router.push('/auth/signin')
  }
})
</script>
