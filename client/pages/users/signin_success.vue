<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store/modules/auth'

export default Vue.extend({
  middleware({ redirect }) {
    if (authStore.isLoggedIn) return redirect('/profile')
  },
  async created() {
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      // authStore.setToken(token)
      await authStore.getMe(token)
      this.$router.push('/profile')
    } else {
      this.notify({
        messages: ['不正な画面遷移です'],
        color: 'warning'
      })
      this.$router.push('/users/signin')
    }
  }
})
</script>
