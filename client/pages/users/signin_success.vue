<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store/modules/auth'
import { notificationStore } from '@/store/modules/notification'

export default Vue.extend({
  created() {
    const token = this.$route.query.token
    if (token && typeof token === 'string') {
      authStore.setToken(token)
    } else {
      notificationStore.notify({
        messages: ['不正な画面遷移です'],
        color: 'warning'
      })
      this.$router.push('/users/signin')
    }
  }
})
</script>
