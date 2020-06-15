<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',
  created() {
    this.notify({
      messages: ['ログインに失敗しました。再度お試しください'],
      color: 'warning'
    })
    this.$router.push('/users/signin')
  }
})
</script>
