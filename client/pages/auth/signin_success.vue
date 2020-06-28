<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '~/store'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',
  async created() {
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      authStore.SET_TOKEN(token)
      await authStore.getMe()
      this.notifyyyy([
        {
          message: 'ログインしました',
          type: 'success'
        }
      ])
      this.$router.push('/profile')
    } else {
      this.notifyyyy([
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
