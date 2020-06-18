<template>
  <vs-radio v-model="input" vs-name="isPublic" :vs-value="vsValue">
    <vs-row
      class="wrapper"
      vs-offset="0.2"
      vs-type="flex"
      vs-justify="flex-start"
    >
      <vs-col vs-w="1" vs-type="flex" vs-align="center" vs-offset="0.3"
        ><vs-icon :icon="icon" size="large"></vs-icon
      ></vs-col>
      <vs-col vs-w="10" vs-offset="0.2">
        <h3>{{ title }}</h3>
        <p>
          {{ description }}
        </p>
      </vs-col>
    </vs-row>
  </vs-radio>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    vsValue: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    input: {
      get(): boolean {
        return this.value
      },
      set(input: boolean) {
        this.$emit('input', input)
      }
    }
  }
})
</script>
