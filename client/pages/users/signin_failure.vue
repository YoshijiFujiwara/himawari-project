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
  created() {
    this.notify({
      messages: ['ログインに失敗しました。再度お試しください'],
      color: 'warning'
    })
    this.$router.push('/users/signin')
  }
})
</script>
