<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',
  created() {
    this.notifyyyy([
      {
        message: 'ログインに失敗しました。再度お試しください',
        type: 'warning'
      }
    ])
    this.$router.push('/auth/signin')
  }
})
</script>
