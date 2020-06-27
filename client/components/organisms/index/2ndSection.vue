<template>
  <v-row class="pl-5 pr-5" justify="center">
    <v-col cols="12" sm="6">
      <v-img :src="require('@/assets/top_img_002.png')" />
    </v-col>
    <v-col cols="12" sm="6" class="pl-10" align-self="center">
      <p
        class="text-center text-md-left text-h4 primary--text font-weight-bold"
      >
        Projectとは？
      </p>
      <p class="text-center text-md-left text-h5 mt-8">
        Project とは、自宅学習のための自習支援サービスです。
      </p>
      <p class="text-center text-md-left text-h5 mt-1">
        勉強した学習内容などの履歴を記録していくことで、
      </p>
      <p class="text-center text-md-left text-h5 mt-1">
        継続する力を身につけ、効率的に勉強を行うことができます。
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
