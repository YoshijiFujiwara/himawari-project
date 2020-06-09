<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    const token = this.$route.query.token
    // TODO: トークンの保持はサインインAPIとの繋ぎ込みのところで一緒にやります
    console.log('token', token)
  }
})
</script>
