<template>
  <vs-row>
    <GoToSigninLink />
    <SignupForm />
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupForm from '@/components/container/auth/signup/SignupForm.vue'
import GoToSigninLink from '@/components/presentational/GoToSigninLink.vue'

export default Vue.extend({
  layout: 'signup',
  middleware: 'guest',
  components: {
    SignupForm,
    GoToSigninLink
  }
})
</script>
