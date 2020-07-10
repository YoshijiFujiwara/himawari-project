<template>
  <div
    v-if="group"
    class="d-flex justify-space-between cardGreyBg ma-0 pt-2 pb-2"
  >
    <div class="d-flex ml-3">
      <v-icon large left color="primary">
        mdi-account-group
      </v-icon>
      <h2>{{ group.name }}</h2>
    </div>
    <div class="d-flex mr-3">
      <v-text-field
        class="ml-6 mr-3"
        hide-details
        placeholder="検索"
        append-icon="mdi-magnify"
        solo
        dense
      ></v-text-field>
      <v-avatar
        v-for="user in group.users"
        :key="user"
        color="indigo"
        size="36"
        class="ma-0"
      >
        <img src="http://i.pravatar.cc/64" />
      </v-avatar>
      <v-btn color="primary" class="ml-3 mr-3">招待</v-btn>
      <v-btn color="white"><v-icon>mdi-cog</v-icon>設定</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'

export default Vue.extend({
  computed: {
    group() {
      return groupStore.groupGetter
    }
  }
})
</script>
