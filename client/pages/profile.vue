<template>
  <div>
    <h1>プロフィール</h1>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        2
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9">
        10
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
