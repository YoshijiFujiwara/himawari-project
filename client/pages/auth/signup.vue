<template>
  <div>
    <!-- スマホ・タブレットの時だけ表示する -->
    <v-row justify="start" class="d-flex d-sm-none d-md-none">
      <p class="ml-6 text-h4 primary--text font-weight-bold">
        <nuxt-link to="/">Project</nuxt-link>
      </p>
    </v-row>
    <!-- スマホ・タブレットの時は非表示 -->
    <v-row justify="end" class="d-none d-sm-flex d-sm-none d-md-flex">
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
    <!-- スマホ・タブレットの時だけ表示する -->
    <v-row
      justify="center"
      align="end"
      class="d-flex d-sm-none d-md-none mt-10"
    >
      <p class="mr-8 mt-4">
        すでにアカウントをお持ちの方は<nuxt-link to="/auth/signin"
          >こちら</nuxt-link
        >
      </p>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupForm from '@/components/organisms/auth/signup/SignupForm.vue'

export default Vue.extend({
  layout: 'guest/vuetify_signup',
  middleware: 'guest',
  components: {
    SignupForm
  }
})
</script>
