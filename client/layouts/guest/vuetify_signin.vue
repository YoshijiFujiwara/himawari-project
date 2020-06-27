<template>
  <v-app class="wrapper">
    <v-container class="pa-0" fluid>
      <v-row class="full-height">
        <!-- PCのみ -->
        <v-col
          v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)"
          class="signinBg"
        >
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
  color: $main-text-color;
}
.full-height {
  min-height: 100vh;
}
</style>
