<template>
  <div>
    <vs-row>
      <h3>{{ label }}</h3>
      <RequiredChip />
    </vs-row>
    <div class="input-times">
      <vs-input
        v-model="input.hours"
        size="large"
        type="number"
        class="input-time"
      />
      <span>時間</span>
      <vs-input
        v-model="input.minutes"
        size="large"
        type="number"
        class="input-time"
      />
      <span>分</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import RequiredChip from '@/components/atoms/RequiredChip.vue'

type Value = {
  hours: number
  minutes: number
}
export default Vue.extend({
  components: {
    RequiredChip
  },
  props: {
    value: {
      type: Object as PropType<Value>,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    input: {
      get(): Value {
        return this.value
      },
      set(input: Value) {
        this.$emit('input', input)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.input-times {
  span {
    display: inline-block;
    margin: 0 0.5em;
  }
  .input-time {
    width: 80px;
    display: inline-block;
  }
}
</style>
