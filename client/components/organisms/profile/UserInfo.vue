<template>
  <v-main>
    <!-- ユーザー情報 -->
    <v-img :src="require('@/assets/icon_sample.jpeg')" />
    <p class="text-h5 text-center">{{ Iam.username }}</p>
    <p>
      プロフィールの「一言」の内容が表示されます。
      プロフィールの「一言」の内容が表示されます。
      プロフィールの「一言」の内容が表示されます。
    </p>
    <v-btn color="white" block>プロフィール編集</v-btn>
    <v-divider class="my-7"></v-divider>
    <div class="d-flex flex-column pl-5">
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">timer</v-icon>
        <div class="d-flex flex-column">
          <p class="font-weight-bold mb-0 text-h6">累計学習時間</p>
          <p class="text-subtitle-1">{{ commitSummary.totalTime }}</p>
        </div>
      </div>
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">flag</v-icon>
        <div class="d-flex flex-column">
          <p class="font-weight-bold mb-0 text-h6">目標達成数</p>
          <p class="text-subtitle-1">99</p>
        </div>
      </div>
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">edit</v-icon>
        <div class="d-flex flex-column">
          <p class="font-weight-bold mb-0 text-h6">累計学習数</p>
          <p class="text-subtitle-1">{{ commitSummary.totalCount }}</p>
        </div>
      </div>
    </div>
    <v-divider class="my-7"></v-divider>
    <v-list-item-group color="primary">
      <v-subheader>グループ</v-subheader>
      <v-list-item v-for="(group, index) in Iam.groups" :key="index">
        <v-list-item-avatar>
          <v-icon color="indigo">group</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ group.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-badge color="error" content="6">
            11:24
          </v-badge>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CommitsSummary } from '@/openapi'

export default Vue.extend({
  computed: {
    commitSummary(): CommitsSummary {
      return goalStore.commitSummaryGetter
    }
  }
})
</script>
