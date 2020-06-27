<template>
  <v-app>
    <v-container class="wrapper" fluid>
      <nuxt />
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
  color: $main-text-color;
}
</style>
