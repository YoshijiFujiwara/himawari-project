<template>
  <v-app class="wrapper">
    <v-container class="pa-0" fluid>
      <v-row class="full-height">
        <v-col cols="12" md="7"><nuxt /></v-col>
        <!-- PCのみ -->
        <v-col
          v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)"
          md="5"
          class="signupBg"
        >
        </v-col>
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
