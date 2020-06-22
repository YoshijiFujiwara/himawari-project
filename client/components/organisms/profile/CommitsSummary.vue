<template>
  <vs-row vs-type="flex" vs-align="flex-end">
    <vs-col
      v-for="(col, index) in 12"
      :key="index"
      v-tooltip="'col - 1'"
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="1"
    >
      8.3%
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
