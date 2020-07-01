<template lang="html">
  <v-overlay :value="nowLoading">
    <v-progress-circular
      indeterminate
      size="64"
      :width="6"
      color="amber"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
