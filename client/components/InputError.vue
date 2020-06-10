<template>
  <div>
    <span v-if="errors.length" class="help is-danger">
      {{ errors[0] }}
    </span>
    <span v-else class="help is-clear"><br /></span>
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

<style lang="scss">
.is-danger {
  display: block;
  padding-top: 3px;
  color: #fa0000;
}
.is-clear {
  display: block;
  padding-top: 3px;
  color: #ffffff;
}
</style>
