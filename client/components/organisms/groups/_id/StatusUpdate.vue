<template>
  <v-timeline-item right="true" class="mainText--text mb-12">
    <template v-slot:icon>
      <v-avatar>
        <img src="http://i.pravatar.cc/64" />
      </v-avatar>
    </template>
    <template v-slot:opposite class="p-12">
      <span>mm:ss</span>
    </template>
    <h5 class="mb-5">
      ユーザーID:さんが目標を達成しました
    </h5>
    <v-card class="elevation-2">
      <v-card-title class="headline"
        >APEXプレデター到達するぞ！！
        <span class="subtitle-1">
          を達成しました！おめでとうございます！
        </span>
        <v-spacer />
        <v-btn icon class="mb-12">
          <v-icon color="satisfyIcon">mdi-emoticon-outline</v-icon>
        </v-btn>
        <v-btn icon class="mb-12">
          <v-icon>mdi-reply</v-icon>
        </v-btn>
      </v-card-title>
      <v-card></v-card>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
