<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '~/store'

export default Vue.extend({
  layout: 'guest/default',
  middleware: 'guest',
  async created() {
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      authStore.saveToken(token)
      await authStore.getMe()
      this._notifyyyy([
        {
          message: 'ログインしました',
          type: 'success'
        }
      ])
      this.$router.push('/profile')
    } else {
      this._notifyyyy([
        {
          message: '不正な画面遷移です',
          type: 'warning'
        }
      ])
      this.$router.push('/auth/signin')
    }
  }
})
</script>
