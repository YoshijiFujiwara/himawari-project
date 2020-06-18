<template>
  <div>
    <h1>プロフィール</h1>
    <p>このページはログインしてないと見られないです！🌻</p>
    <h3>ユーザー情報: {{ JSON.stringify(Iam) }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
