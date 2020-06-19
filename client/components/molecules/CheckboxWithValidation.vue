<template>
  <vs-col vs-type="flex" vs-justify="start" vs-w="12">
    <validation-provider rules="required:true" :name="name">
      <vs-checkbox v-model="input" icon="check" vs-value="ok">{{
        text
      }}</vs-checkbox>
    </validation-provider>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
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
.vs-col {
  margin-bottom: 20px;
  color: #777777;
  font-family: HiraginoSans-W5;
}
</style>
