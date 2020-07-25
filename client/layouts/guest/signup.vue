<template>
  <v-app class="wrapper">
    <!-- ローディング -->
    <Loading />
    <!-- 通知 -->
    <Notifications />
    <v-container class="pa-0" fluid>
      <v-row class="full-height">
        <!-- PCのみ -->
        <v-col v-show="_isPC" class="signupBg">
          <p class="text-h4 ml-8 mt-10">
            <nuxt-link class="mainText--text" to="/">Project</nuxt-link>
          </p>
        </v-col>
        <v-col><nuxt /></v-col>
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
  color: #707070; // フォントカラーだけ直書きを許す！
}
.full-height {
  min-height: 100vh;
}
</style>
