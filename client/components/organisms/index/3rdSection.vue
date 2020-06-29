<template>
  <v-row class="mt-n10 pl-5 pr-5" justify="center">
    <!-- スマホのみ -->
    <v-col v-show="_isSP" cols="12" md="6">
      <v-img :src="require('@/assets/top_img_003.png')" />
    </v-col>
    <v-col cols="12" md="6" class="pl-10" align-self="center">
      <p
        class="text-center text-md-left text-h4 primary--text font-weight-bold"
      >
        目標を設定する
      </p>
      <p class="text-center text-md-left text-h5 mt-8">
        目標を設定することで、勉強のゴール地点を明確にし、
      </p>
      <p class="text-center text-md-left text-h5 mt-8">
        履歴や振り返りを行うことで、ゴールに向けて
      </p>
      <p class="text-center text-md-left text-h5 mt-8">
        何をすればいいのかが明確になります。
      </p>
    </v-col>
    <!-- PCのみ -->
    <v-col v-show="_isPC" cols="12" md="6">
      <v-img :src="require('@/assets/top_img_003.png')" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
