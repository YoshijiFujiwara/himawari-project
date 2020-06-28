<template>
  <v-row class="pl-5 pr-16">
    <v-col cols="2" class="px-5">
      <UserInfo />
    </v-col>
    <v-col cols="10">
      <!-- 目標一覧 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">目標一覧</p>
        <GoalList />
      </v-col>
      <!-- 学習状況 -->
      <v-col class="mt-5">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsSummary />
      </v-col>
      <!-- 学習記録 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">学習記録</p>
        <CommitsTable />
      </v-col>
    </v-col>
    {{ name }}
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore, goalStore } from '@/store'
import CommitsSummary from '@/components/organisms/profile/CommitsSummary.vue'
import CommitsTable from '@/components/organisms/profile/CommitsTable.vue'
import GoalList from '@/components/organisms/profile/GoalList.vue'
import UserInfo from '@/components/organisms/profile/UserInfo.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsSummary,
    CommitsTable,
    GoalList,
    UserInfo
  },
  async created() {
    this.startLoading()

    // ログインユーザー情報の参照
    await authStore.getMe()
    // 目標の一覧
    await goalStore.getGoals()
    // 自分の学習記録一覧取得（全ての目標を跨ぐ）
    await goalStore.getMyAllCommits()
    // コミットのサマリーを取得（合計記録数や合計の時間）
    await goalStore.getCommitSummary()
    // 月ごとのコミットの数を取得
    await goalStore.getCommitsByMonthly()

    this.finishLoading()
  }
})
</script>
