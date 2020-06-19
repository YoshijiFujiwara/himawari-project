<template>
  <vs-row>
    <GoToLink text="既にアカウントをお持ちではない方は" to="/auth/signup" />
    <SigninForm />
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SigninForm from '@/components/organisms/auth/signin/SigninForm.vue'
import GoToLink from '@/components/atoms/GoToLink.vue'

export default Vue.extend({
  layout: 'signup',
  middleware: 'guest',
  components: {
    SigninForm,
    GoToLink
  }
})
</script>
