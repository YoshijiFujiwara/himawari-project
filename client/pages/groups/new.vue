<template>
  <div>
    <CreateGroupForm />
  </div>
</template>

<script>
import Vue from 'vue'
import CreateGroupForm from '@/components/organisms/groups/new/CreateGroupForm'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CreateGroupForm
  }
})
</script>

<style></style>
