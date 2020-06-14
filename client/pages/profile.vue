<template>
  <div>
    <h1>プロフィール</h1>
    <p>このページはログインしてないと見られないです！🌻</p>
    <h3>ユーザー情報: {{ JSON.stringify(Iam) }}</h3>
    <vs-button color="dark" type="border" @click="logout"
      >ログアウト(仮)</vs-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '~/store'

export default Vue.extend({
  middleware: 'authenticated',
  methods: {
    logout() {
      authStore.logout()
      this.$router.push('/users/signin')
    }
  }
})
</script>
