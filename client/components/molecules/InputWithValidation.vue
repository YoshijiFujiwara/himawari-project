<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="label">
    <vs-row v-if="isBigLabel">
      <vs-row>
        <h3>{{ label }}</h3>
        <RequiredChip />
      </vs-row>
    </vs-row>
    <vs-input
      v-model="input"
      :label="isBigLabel ? undefined : label"
      :size="size"
      :type="type"
    />
    <InputError :errors="errors" />
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import InputError from '@/components/atoms/InputError.vue'
import RequiredChip from '@/components/atoms/RequiredChip.vue'

export default Vue.extend({
  components: {
    InputError,
    RequiredChip
  },
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'large'
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
    },
    isBigLabel: {
      type: Boolean,
      default: false
    },
    useRequiredChip: {
      type: Boolean,
      default: false
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
.vs-input {
  width: 100%;
}
</style>
