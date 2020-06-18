<template>
  <vs-row>
    <GoToSigninLink />
    <SignupForm />
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupForm from '@/components/organisms/SignupForm.vue'
import GoToSigninLink from '@/components/atoms/GoToSigninLink.vue'

export default Vue.extend({
  layout: 'signup',
  middleware: 'guest',
  components: {
    SignupForm,
    GoToSigninLink
  }
})
</script>
