<template>
  <div v-if="group">
    <!-- PC用の表示 -->
    <div v-show="_isPC">
      <div class="d-flex justify-space-between cardGreyBg ma-0 pt-2 pb-2">
        <div class="d-flex ml-3">
          <v-icon large left color="primary">
            mdi-account-group
          </v-icon>
          <h2>{{ group.name }}</h2>
        </div>
        <div class="d-flex mr-3">
          <div class="d-flex">
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
              :key="user.id"
              color="indigo"
              size="36"
              class="ma-0"
            >
              <v-img v-if="user.avatarUrl" :src="user.avatarUrl" />
              <svg
                v-else
                viewBox="0 0 640 640"
                v-html="jdenticonSvg(user.email)"
              ></svg>
            </v-avatar>
            <v-btn color="primary" class="ml-3 mr-3">招待</v-btn>
            <v-btn color="white"><v-icon>mdi-cog</v-icon>設定</v-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- スマホ用の表示 -->
    <div v-show="_isSP" class="col-sm-12">
      <div class="col-12 d-flex">
        <v-icon left color="primary" class="d-flex">
          mdi-account-group
        </v-icon>
        <h2 class="d-flex">{{ group.name }}</h2>
        <v-btn small class="d-flex ml-3" color="white">
          <v-icon>mdi-cog</v-icon>設定
        </v-btn>
      </div>
      <div class="col-12">
        <v-avatar
          v-for="user in group.users"
          :key="user.id"
          color="indigo"
          size="36"
          class="ma-0 d-inline-flex"
        >
          <v-img v-if="user.avatarUrl" :src="user.avatarUrl" />
          <svg
            v-else
            viewBox="0 0 640 640"
            v-html="jdenticonSvg(user.email)"
          ></svg>
        </v-avatar>
        <v-btn small color="primary" class="ml-3 mr-3">招待</v-btn>
      </div>
      <div class="col-12">
        <v-text-field
          class=""
          hide-details
          placeholder="検索"
          append-icon="mdi-magnify"
          solo
          dense
        ></v-text-field>
      </div>
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
