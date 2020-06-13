<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    // todo Notification
    this.$router.push('/users/signin')
  }
})
</script>
