<template>
  <vs-col vs-type="flex" vs-justify="start" vs-w="12">
    <vs-button
      size="large"
      :color="color"
      :type="buttonType"
      :disabled="disabled"
      @click="onClick"
      >{{ text }}
    </vs-button>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'filled'
    },
    color: {
      type: String,
      default: 'primary'
    },
    onClick: {
      type: Function,
      required: true
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
  .vs-button-text {
    align-content: center;
  }
  .vs-button {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
