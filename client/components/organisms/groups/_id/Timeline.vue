<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <p>たいむらいん</p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
