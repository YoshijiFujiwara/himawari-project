<template>
  <v-row class="mb-6 full-height" no-gutters>
    <v-col cols="12" md="8">
      <v-row>
        <v-col class="ml-10 mt-10 mainText--text text-h4 font-weight-bold">
          <nuxt-link to="/">Project</nuxt-link>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-10">
        <v-col cols="9" class="text-center">
          <v-img
            class="mx-auto mb-5"
            :src="require('@/assets/404_himawari.png')"
            max-width="400"
          />
          <p class="text-h5 font-weight-bold">
            ご指定のページが見つかりませんでした。
          </p>
          <p class="font-weight-bold">
            アクセスしようとしたページは削除、変更されたか、現在利用できない可能性があります。<br />
            お手数ですが、Projectホームページのトップ又は下記のリンクよりお探しください。
          </p>
          <v-btn class="ma-2 mt-8" color="primary" to="/">
            ホームページへ
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-show="_isPC" cols="12" md="4" class="orangeBg"></v-col>
  </v-row>
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

<style lang="scss" scoped>
.full-height {
  min-height: 100vh;
}
</style>
