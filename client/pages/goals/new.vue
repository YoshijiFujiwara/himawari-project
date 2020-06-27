<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <CreateGoalForm />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateGoalForm from '@/components/organisms/goals/new/CreateGoalForm.vue'

export default Vue.extend({
  layout: 'vuetify_default',
  middleware: 'authenticated',
  components: {
    CreateGoalForm
  }
})
</script>
