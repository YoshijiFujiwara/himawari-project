<template>
  <div>
    <v-row justify="end">
      <p class="mr-8 mt-4">
        すでにアカウントをお持ちの方は<nuxt-link to="/auth/signin"
          >こちら</nuxt-link
        >
      </p>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <p class="text-h4 font-weight-bold">
          Projectに登録
        </p>
        <SignupForm />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupForm from '@/components/organisms/auth/signup/SignupForm.vue'

export default Vue.extend({
  layout: 'vuetify_signup',
  middleware: 'guest',
  components: {
    SignupForm
  }
})
</script>
