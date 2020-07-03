<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <CreateGroupForm />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateGroupForm from '@/components/organisms/groups/new/CreateGroupForm.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CreateGroupForm
  }
})
</script>
