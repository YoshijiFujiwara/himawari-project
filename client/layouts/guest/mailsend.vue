<template>
  <v-app class="wrapper">
    <!-- ローディング -->
    <Loading />
    <!-- 通知 -->
    <Notifications />
    <v-container class="pa-0" fluid>
      <v-row class="full-height">
        <v-col cols="12" md="7"><nuxt /></v-col>
        <!-- PCのみ -->
        <v-col v-show="_isPC" md="5" class="signupBg"> </v-col>
      </v-row>
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
.full-height {
  min-height: 100vh;
}
</style>
