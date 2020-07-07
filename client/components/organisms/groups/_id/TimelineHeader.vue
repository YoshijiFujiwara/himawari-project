<template>
  <div class="d-flex justify-space-between cardGreyBg ma-0 pa-0">
    <div class="d-flex ml-3">
      <v-icon large left color="primary">
        mdi-account-group
      </v-icon>
      <h1>グループ名</h1>
    </div>
    <div class="d-flex mr-3">
      <v-text-field
        class="ml-6"
        hide-details
        placeholder="検索"
        append-icon="mdi-magnify"
        solo
        dense
      ></v-text-field>
      <v-avatar v-for="(avatar, i) in 3" :key="i" color="indigo" size="36">
        <span class="white--text headline">36</span>
      </v-avatar>
      <v-btn color="primary">招待</v-btn>
      <v-btn><v-icon>mdi-brightness-7</v-icon>設定</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
