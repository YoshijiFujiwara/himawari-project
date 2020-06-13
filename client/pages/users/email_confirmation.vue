<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store/modules/auth'

export default Vue.extend({
  async created() {
    // メールアドレス認証用トークン
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      this.$vs.loading()
      const isSuccess = await authStore.confirmEmail(token)
      this.$vs.loading.close()
      if (isSuccess) {
        // todo Notification
      }
      this.$router.push('/users/signin')
    } else {
      // todo Notification

      this.$router.push('/users/signin')
    }
  }
})
</script>
