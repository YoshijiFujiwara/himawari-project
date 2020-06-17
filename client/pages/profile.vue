<template>
  <div>
    <h1>プロフィール</h1>
    <p>このページはログインしてないと見られないです！🌻</p>
    <h3>ユーザー情報: {{ JSON.stringify(Iam) }}</h3>
    <ul>
      <li><nuxt-link to="/goals/new">目標作成画面</nuxt-link></li>
      <li><nuxt-link to="/goals/1">目標詳細画面</nuxt-link></li>
    </ul>
    <nuxt-link to="/auth/logout">ログアウト(仮)</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
