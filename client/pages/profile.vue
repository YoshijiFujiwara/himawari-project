<template>
  <v-row>
    <v-col cols="12" md="2" class="px-5">
      <UserInfo
        v-if="Iam"
        :user="Iam"
        :goals="goals"
        :groups="groups"
        :commit-summary="commitSummary"
      />
    </v-col>
    <v-col cols="12" md="10">
      <!-- 学習状況 スマホはこっち -->
      <v-col v-show="_isSP">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsSummarySP :commits-by-monthly="commitsByMonthly" />
      </v-col>
      <!-- 目標一覧 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">目標一覧</p>
        <GoalList />
      </v-col>
      <!-- 学習状況 PCはこっち -->
      <v-col v-show="_isPC" class="mt-5">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsSummary :commits-by-monthly="commitsByMonthly" />
      </v-col>
      <!-- 学習記録 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">学習記録</p>
        <CommitsTable :goal-summary="goalSummary" />
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
import {
  CommitsSummary as CommitSummaryType,
  GroupSerializer,
  GoalSerializer,
  MonthlyCount
} from '@/openapi'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsSummary,
    CommitsSummarySP,
    CommitsTable,
    GoalList,
    UserInfo
  },
  computed: {
    commitSummary(): CommitSummaryType {
      return goalStore.commitSummaryGetter
    },
    groups(): GroupSerializer[] {
      return groupStore.groupsGetter
    },
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    },
    commitsByMonthly(): MonthlyCount[] {
      return goalStore.commitByMonthlyGetter
    },
    goalSummary(): object | null {
      return goalStore.goalSummaryGetter
    }
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
