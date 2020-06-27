<template>
  <v-app class="wrapper">
    <v-app-bar elevation="2" color="white" fixed app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="primary--text">Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goSigninPage">
        ログイン
      </v-btn>
      <v-btn color="primary" @click="goSignupPage">
        登録する
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer absolute app color="topFooterBg">
      <v-row justify="between" class="px-4">
        <v-col
          cols="12"
          sm="6"
          class="white--text ml-4 text-center text-md-left"
        >
          © 2020 Project. All right reserved.
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
export default Vue.extend({
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
  color: #707070; // アプリケーション全体を通した文字のメインカラー
}
</style>
