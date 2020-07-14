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
            :src="require('@/assets/verify_ing.png')"
            max-width="400"
          />
          <p class="text-h5 font-weight-bold">
            <v-icon color="warning" x-large>mdi-alert</v-icon>
            メールアドレスの確認をお願いします。
          </p>
          <p>
            HimawariHubを利用するには、メールアドレスの認証を完了する必要があります。<br />
            <span class=" font-weight-bold">sumi@himawari.com</span
            >に確認メールが送信されました。
          </p>
        </v-col>
      </v-row>
    </v-col>
    <!-- PCのみ -->
    <v-col v-show="_isPC" cols="12" md="4" class="orangeBg"></v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'guest/default'
})
</script>

<style lang="scss" scoped>
.full-height {
  min-height: 100vh;
}
</style>
