<template>
  <vs-col vs-type="flex" vs-w="12">
    <vs-card>
      <vs-list v-for="(col, index) in 3" :key="index">
        <vs-list-item title="ここtable"></vs-list-item>
      </vs-list>
    </vs-card>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
