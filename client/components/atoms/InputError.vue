<template>
  <div>
    <span class="margin">
      <span v-if="errors.length" class="help">
        {{ errors[0] }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  props: {
    errors: {
      type: Array as PropType<string[]>,
      default: []
    }
  }
})
</script>

<style lang="scss" scoped>
.margin {
  display: block;
  height: 10px;
}
.is-danger {
  padding-top: 3px;
}
.is-clear {
  display: block;
  padding-top: 3px;
  color: #ffffff;
}
</style>
