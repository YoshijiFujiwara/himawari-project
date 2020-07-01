<template>
  <v-app class="wrapper">
    <!-- ローディング -->
    <Loading />
    <!-- 通知 -->
    <Notifications />
    <v-container class="pa-0" fluid>
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
  color: $main-text-color;
}
</style>
