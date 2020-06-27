<template>
  <v-row class="topPageBg pt-12 pl-5 pr-5" justify="center">
    <!-- スマホのみ -->
    <v-col
      v-show="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
      cols="12"
      md="6"
    >
      <v-img :src="require('@/assets/top_img_001.png')" />
    </v-col>
    <v-col cols="12" md="6" class="pl-10 pb-10" align-self="center">
      <p
        class="text-center text-md-left text-h4 primary--text font-weight-bold"
      >
        手軽に学習を記録し、シェアしよう。
      </p>
      <p class="text-center text-md-left text-h5 mt-8">
        記録が億劫な人でも簡単に学習を記録。
      </p>
      <p class="text-center text-md-left text-h5 mt-1">
        友達と簡単に応援し合えるような学習環境を提供します。
      </p>
      <!-- PCのみ -->
      <v-btn
        v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)"
        color="primary mt-10"
        large
        min-width="200"
        @click="gotoSignupPage"
        >始める</v-btn
      >
      <!-- スマホのみ -->
      <v-btn
        v-show="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
        color="primary mt-10"
        block
        >始める</v-btn
      >
    </v-col>
    <!-- PCのみ -->
    <v-col
      v-show="!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm)"
      cols="12"
      md="6"
    >
      <v-img :src="require('@/assets/top_img_001.png')" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    gotoSignupPage() {
      this.$router.push('/auth/signup')
    }
  }
})
</script>
