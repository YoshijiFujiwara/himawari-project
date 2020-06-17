<template>
  <div>
    <h1>{{ username }}さんのプロフィール</h1>
    <ul>
      <li><nuxt-link to="/goals/new">目標作成画面（仮）</nuxt-link></li>
      <li><nuxt-link to="/goals/1">目標詳細画面（仮）</nuxt-link></li>
    </ul>
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
  data() {
    return {
      username: this.$route.params.username
    }
  },
  methods: {
    logout() {
      authStore.logout()
      this.$router.push('/auth/signin')
    }
  }
})
</script>
