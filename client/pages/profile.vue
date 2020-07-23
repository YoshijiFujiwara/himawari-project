<template>
  <v-row>
    <v-col cols="12" md="2" class="px-5">
      <UserInfo />
    </v-col>
    <v-col cols="12" md="10">
      <!-- 学習状況 スマホはこっち -->
      <v-col v-show="_isSP">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsSummarySP />
      </v-col>
      <!-- 目標一覧 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">目標一覧</p>
        <GoalList />
      </v-col>
      <!-- 学習状況 PCはこっち -->
      <v-col v-show="_isPC" class="mt-5">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsSummary />
      </v-col>
      <!-- 学習記録 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">学習記録</p>
        <CommitsTable />
      </v-col>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore, goalStore, groupStore } from '@/store'
import CommitsSummary from '@/components/organisms/profile/CommitsSummary.vue'
import CommitsSummarySP from '@/components/organisms/profile/CommitsSummarySP.vue'
import CommitsTable from '@/components/organisms/profile/CommitsTable.vue'
import GoalList from '@/components/organisms/profile/GoalList.vue'
import UserInfo from '@/components/organisms/profile/UserInfo.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsSummary,
    CommitsSummarySP,
    CommitsTable,
    GoalList,
    UserInfo
  },
  created() {
    this._startLoading()

    Promise.all([
      // ログインユーザー情報の参照
      authStore.getMe(),
      // 参加しているグループ一覧を参照
      groupStore.getGroups(),
      // 目標の一覧
      goalStore.getGoals(),
      // 自分の学習記録一覧取得（全ての目標を跨ぐ）
      goalStore.getMyAllCommits(),
      // コミットのサマリーを取得（合計記録数や合計の時間）
      goalStore.getCommitSummary(),
      // 月ごとのコミットの数を取得
      goalStore.getCommitsByMonthly(),
      // 学習記録と目標の月ごとのサマリー取得
      goalStore.getSummary()
    ])

    this._finishLoading()
  }
})
</script>
