<template>
  <v-row class="topPageBg pt-12 pl-5 pr-5" justify="center">
    <!-- スマホ・タブレットの時だけ表示する -->
    <v-col cols="12" sm="6" class="d-flex d-sm-none d-md-none">
      <v-img :src="require('@/assets/top_img_001.png')" />
    </v-col>
    <v-col cols="12" sm="6" class="pl-10 pb-10" align-self="center">
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
      <!-- PC -->
      <v-btn
        color="primary mt-10"
        class="d-none d-sm-flex d-sm-none d-md-flex"
        large
        min-width="200"
        >始める</v-btn
      >
      <!-- スマホ・タブレット -->
      <v-btn color="primary mt-10" class="d-flex d-sm-none d-md-none" block
        >始める</v-btn
      >
    </v-col>
    <!-- スマホ・タブレットの時は非表示 -->
    <v-col cols="12" sm="6" class="d-none d-sm-flex d-sm-none d-md-flex">
      <v-img :src="require('@/assets/top_img_001.png')" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
