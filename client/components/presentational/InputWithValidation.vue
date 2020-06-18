<template>
  <vs-col>
    <validation-provider v-slot="{ errors }" :rules="rules" :name="label">
      <vs-input v-model="input" :label="label" size="large" :type="type" />
      <InputError :errors="errors" />
    </validation-provider>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'
import InputError from '@/components/presentational/InputError.vue'

export default Vue.extend({
  components: {
    InputError
  },
  props: {
    value: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
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
  .vs-input {
    width: 100%;
  }
}
</style>
