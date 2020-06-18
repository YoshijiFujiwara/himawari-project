<template>
  <vs-row>
    <GoToLink text="すでにアカウントをお持ちの方は" to="/auth/signin" />
    <SignupForm />
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupForm from '@/components/organisms/auth/signup/SignupForm.vue'
import GoToLink from '@/components/atoms/GoToLink.vue'

export default Vue.extend({
  layout: 'signup',
  middleware: 'guest',
  components: {
    SignupForm,
    GoToLink
  }
})
</script>
