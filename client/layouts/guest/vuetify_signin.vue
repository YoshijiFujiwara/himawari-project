<template>
  <v-app>
    <v-container class="wrapper" fluid>
      <v-row class="full-height">
        <v-col class="signinBg d-none d-sm-flex d-none d-sm-flex">
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
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0;
  color: #707070; // アプリケーション全体を通した文字のメインカラー
}
.full-height {
  min-height: 100vh;
}
</style>
