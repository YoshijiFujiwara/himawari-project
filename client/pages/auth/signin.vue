<template>
  <div>
    <!-- スマホのみ -->
    <v-row v-show="_isSP" justify="start">
      <p class="ml-6 text-h4 primary--text font-weight-bold">
        <nuxt-link to="/">Project</nuxt-link>
      </p>
    </v-row>
    <!-- PCのみ -->
    <v-row v-show="_isPC" justify="end">
      <p class="mr-8 mt-4">
        アカウントをお持ちでない方は<nuxt-link to="/auth/signup"
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
    <!-- スマホのみ -->
    <v-row v-show="_isSP" justify="center" align="end" class="mt-10">
      <p>
        アカウントをお持ちでない方は<nuxt-link to="/auth/signup"
          >こちら</nuxt-link
        >
      </p>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SigninForm from '@/components/organisms/auth/signin/SigninForm.vue'

export default Vue.extend({
  layout: 'guest/signin',
  middleware: 'guest',
  components: {
    SigninForm
  }
})
</script>
