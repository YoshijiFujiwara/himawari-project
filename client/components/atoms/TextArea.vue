<template>
  <div>
    <h3>{{ label }}</h3>
    <vs-textarea v-model="input" :height="height" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  computed: {
    input: {
      get(): string {
        return this.value
      },
      set(input: string) {
        this.$emit('input', input)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
h3 {
  font-size: 20px;
}
</style>
