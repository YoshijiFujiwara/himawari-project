<template>
  <v-main>
    <!-- ユーザー情報 -->
    <v-row>
      <v-col cols="4" md="12">
        <v-img :src="require('@/assets/icon_sample.jpeg')" />
      </v-col>
      <v-col cols="8" md="12">
        <p class="text-h5 text-center">{{ Iam.username }}</p>
        <p>
          プロフィールの「一言」の内容が表示されます。
          プロフィールの「一言」の内容が表示されます。
          プロフィールの「一言」の内容が表示されます。
        </p>
      </v-col>
    </v-row>

    <v-btn color="white" block>プロフィール編集</v-btn>
    <!-- PCのみ（スマホの場合は、透明にします） -->
    <v-divider class="my-7" :class="_isSP && 'transparent'"></v-divider>
    <div class="d-flex flex-row flex-md-column">
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">mdi-timer-outline</v-icon>
        <div class="d-flex flex-column">
          <p class="font-weight-bold mb-0 text-h6">累計学習時間</p>
          <p class="text-subtitle-1">{{ commitSummary.totalTime }}</p>
        </div>
      </div>
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">mdi-flag</v-icon>
        <div class="d-flex flex-column">
          <p class="font-weight-bold mb-0 text-h6">目標達成数</p>
          <p class="text-subtitle-1">99</p>
        </div>
      </div>
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">mdi-pencil</v-icon>
        <div class="d-flex flex-column">
          <p class="font-weight-bold mb-0 text-h6">累計学習数</p>
          <p class="text-subtitle-1">{{ commitSummary.totalCount }}</p>
        </div>
      </div>
    </div>
    <!-- PCのみ（スマホの場合は、サイドバーで見れるからかな） -->
    <v-divider v-show="_isPC" class="my-7"></v-divider>
    <!-- PCのみ（スマホの場合は、サイドバーで見れるからかな） -->
    <v-list-item-group v-show="_isPC" color="primary">
      <v-subheader>グループ</v-subheader>
      <v-list-item v-for="(group, index) in Iam.groups" :key="index">
        <v-list-item-avatar>
          <v-icon color="indigo">mdi-account-group</v-icon>
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
  },
  created() {
    this.$vuetify
  }
})
</script>
