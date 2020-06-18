<template>
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
    <vs-divider>{{ text }}</vs-divider>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    }
  }
})
</script>
