<template>
  <div>
    <v-row justify="start">
      <p class="ml-6 text-h4 primary--text font-weight-bold">
        <nuxt-link to="/">Project</nuxt-link>
      </p>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <v-img
          class="mx-auto"
          :src="require('@/assets/mailsendman.png')"
          max-width="300"
        />
        <p class="text-h5 text-center font-weight-bold">
          アカウント認証用のメールを送信しました。
        </p>
        <p class="text-center">
          {{ $route.query.email }} へ受信確認用のメールを送信しました。
        </p>
        <p class="text-center">
          メールをご確認いただき、メールに記載されたURLをクリックして認証を完了してください。
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'guest/mailsend',
  middleware: 'guest'
})
</script>
