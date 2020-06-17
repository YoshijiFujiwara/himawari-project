<template>
  <div>
    <CreateGoalsForm :handle-submit="onSubmit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateGoalsForm from '@/components/pages/goals/CreateGoalsForm.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CreateGoalsForm
  },
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      alert('hogehoge')
    }
  }
})
</script>

<style lang="scss" scoped></style>
