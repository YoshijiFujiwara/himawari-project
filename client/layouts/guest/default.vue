<template>
  <v-app>
    <!-- ローディング -->
    <Loading />
    <!-- 通知 -->
    <Notifications />
    <v-container class="pa-0 wrapper" fluid>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/molecules/Loading.vue'
import Notifications from '@/components/molecules/Notifications.vue'

export default Vue.extend({
  components: {
    Loading,
    Notifications
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  color: #707070; // フォントカラーだけ直書きを許す！
}
</style>
