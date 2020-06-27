<template>
  <div>
    <v-row justify="end">
      <p class="mr-8 mt-4">
        すでにアカウントをお持ちの方は<nuxt-link to="/auth/signup"
          >こちら</nuxt-link
        >
      </p>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <p class="text-h4 font-weight-bold">
          Projectにログイン
        </p>
        <SigninForm />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SigninForm from '@/components/organisms/auth/signin/SigninForm.vue'

export default Vue.extend({
  layout: 'vuetify_signin',
  middleware: 'guest',
  components: {
    SigninForm
  }
})
</script>
