<template>
  <validation-provider v-slot="{ errors }" :rules="rules" :name="label">
    <vs-row v-if="isBigLabel">
      <vs-row>
        <h3>{{ label }}</h3>
        <RequiredChip v-if="useRequiredChip" />
      </vs-row>
    </vs-row>
    <vs-select v-model="input">
      <vs-select-item
        v-for="(item, index) in selectItems"
        :key="index"
        size="large"
        :value="item.value"
        :text="item.text"
      />
    </vs-select>
    <InputError :errors="errors" />
  </validation-provider>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import InputError from '@/components/atoms/InputError.vue'
import RequiredChip from '@/components/atoms/RequiredChip.vue'

type Item = {
  text: string
  value: number
}
export default Vue.extend({
  components: {
    InputError,
    RequiredChip
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    selectItems: {
      type: Array as PropType<Item[]>,
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
      get(): number {
        return this.value
      },
      set(input: number) {
        this.$emit('input', input)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.vs-select {
  width: 100%;
}
</style>
