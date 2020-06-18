<template>
  <vs-row>
    <GoToSignupLink />
    <SigninForm />
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SigninForm from '@/components/container/auth/signin/SigninForm.vue'
import GoToSignupLink from '@/components/presentational/GoToSignupLink.vue'

export default Vue.extend({
  layout: 'signup',
  middleware: 'guest',
  components: {
    SigninForm,
    GoToSignupLink
  }
})
</script>
