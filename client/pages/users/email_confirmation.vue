<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { notificationStore } from '@/store/modules/notification'
import { authStore } from '@/store/modules/auth'
import { loadingStore } from '@/store/modules/loading'

export default Vue.extend({
  async created() {
    loadingStore.startLoading()
    // メールアドレス認証用トークン
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      const isSuccess = await authStore.confirmEmail(token)
      if (isSuccess) {
        notificationStore.notify({
          messages: ['メール確認が完了しました'],
          color: 'success'
        })
      }
      this.$router.push('/users/signin')
    } else {
      notificationStore.notify({
        messages: ['不正な画面遷移です'],
        color: 'warning'
      })
      this.$router.push('/users/signin')
    }
    loadingStore.endLoading()
  }
})
</script>
