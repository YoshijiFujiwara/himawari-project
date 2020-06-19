<template>
  <div>
    <CreateGoalForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateGoalForm from '@/components/organisms/goals/new/CreateGoalForm.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CreateGoalForm
  }
})
</script>
