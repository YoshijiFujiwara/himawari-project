<template>
  <div>
    <h1>{{title}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  title: string
}
export default Vue.extend({
  data(): DataType {
    return {
      title: 'hello world'
    }
  }
})
</script>
