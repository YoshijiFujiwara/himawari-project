<template>
  <div>
    <!-- スマホのみ -->
    <v-row v-show="_isSP" justify="start">
      <p class="ml-6 text-h4 primary--text font-weight-bold">
        <nuxt-link to="/">To Growth</nuxt-link>
      </p>
    </v-row>
    <!-- PCのみ-->
    <v-row v-show="_isPC" justify="end">
      <p class="mr-8 mt-4">
        すでにアカウントをお持ちの方は<nuxt-link to="/auth/signin"
          >こちら</nuxt-link
        >
      </p>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <p class="text-h4 font-weight-bold">
          To Growthに登録
        </p>
        <SignupForm />
      </v-col>
    </v-row>
    <!-- スマホのみ -->
    <v-row v-show="_isSP" justify="center" align="end" class="mt-10">
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
  layout: 'guest/signup',
  middleware: 'guest',
  components: {
    SignupForm
  }
})
</script>
