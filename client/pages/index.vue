<template>
  <div>
    <h1>{{ title }}</h1>
    <nuxt-link to="/tasks">タスク管理へ</nuxt-link>
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
      title: 'tasks world'
    }
  }
})
</script>
