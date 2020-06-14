<template>
  <div>
    <h1>プロフィール</h1>
    <h2>ログインしてないと見られない</h2>
    <h3>{{ JSON.stringify(Iam) }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
