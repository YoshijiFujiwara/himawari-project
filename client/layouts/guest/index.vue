<template>
  <v-app>
    <!-- ローディング -->
    <Loading />
    <!-- 通知 -->
    <Notifications />
    <v-app-bar elevation="2" color="white" fixed app>
      <v-toolbar-title class="primary--text">To Growth</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goSigninPage">
        ログイン
      </v-btn>
      <v-btn color="primary" @click="goSignupPage">
        登録する
      </v-btn>
    </v-app-bar>

    <v-main class="wrapper">
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app color="primary">
      <v-row justify="space-between" class="px-4">
        <v-col
          cols="12"
          sm="6"
          class="white--text ml-4 text-center text-md-left"
        >
          COPYRIGHT @ 2020 Himawarigumi, All rights Reserved
        </v-col>
        <v-row
          class="white--text"
          cols="12"
          sm="6"
          justify="center"
          justify-md="end"
          align="center"
        >
          <div class="mx-3">利用規約</div>
          <div class="mx-3">プライバシー</div>
          <div class="mx-3">お問い合わせ</div>
        </v-row>
      </v-row>
    </v-footer>
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
  },
  methods: {
    goSigninPage() {
      this.$router.push('/auth/signin')
    },
    goSignupPage() {
      this.$router.push('/auth/signup')
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  color: #707070; // フォントカラーだけ直書きを許す！
}
</style>
