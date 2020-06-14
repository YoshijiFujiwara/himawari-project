<template>
  <div>
    <h1>プロフィール</h1>
    <h2>ログインしてないと見られない</h2>
    <h3>{{ JSON.stringify(Iam) }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store/modules/auth'

export default Vue.extend({
  middleware({ redirect }) {
    if (authStore.isNOTLoggedIn) return redirect('/users/signin')
  }
})
</script>
