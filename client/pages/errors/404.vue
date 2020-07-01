<template>
  <div>
    ページが見つかりませんでした
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store'

export default Vue.extend({
  layout() {
    return authStore.isLoggedIn ? 'default' : 'guest/default'
  }
})
</script>
