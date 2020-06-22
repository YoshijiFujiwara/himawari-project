<template>
  <vs-row vs-type="flex" vs-justify="flex-start">
    <vs-col vs-offset="1" vs-type="flex" vs-justify="flex-start">
      <Radio
        v-model="input"
        :vs-value="true"
        class="radio-flex"
        icon="public"
        title="公開"
        description="誰でもこの目標を見ることができます。目標を公開にして、みんなと応援し合いましょう！"
      />
    </vs-col>
    <vs-col vs-offset="1" vs-type="flex" vs-justify="flex-start">
      <Radio
        v-model="input"
        :vs-value="false"
        class="radio-flex"
        icon="https"
        title="非公開"
        description="この目標はあなたもしくは、グループメンバーしか見ることができません。"
      />
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Radio from '@/components/molecules/Radio.vue'
export default Vue.extend({
  components: {
    Radio
  },
  props: {
    value: {
      type: Boolean,
      required: true
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
<style lang="scss" scoped>
.radio-flex {
  font-size: calc(5px + 1vw);
}
</style>
