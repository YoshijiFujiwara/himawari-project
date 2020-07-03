<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store'

export default Vue.extend({
  created() {
    authStore.logout()
    this.$router.push('/auth/signin')
    this._notifyyyy([
      {
        message: 'ログアウトしました',
        type: 'success'
      }
    ])
  }
})
</script>
