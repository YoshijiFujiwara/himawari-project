<template>
  <v-row>
    <v-col cols="12" md="2" class="px-5">
      <UserInfo
        v-if="user"
        :user="user"
        :goals="goals"
        :groups="[]"
        :commit-summary="commitSummary"
      />
    </v-col>
    <v-col cols="12" md="10">
      <!-- 学習状況 スマホはこっち -->
      <v-col v-show="_isSP">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsFlowerSP :commits-by-monthly="commitsByMonthly" />
      </v-col>
      <!-- 目標一覧 -->
      <v-col>
        <p class="text-h5 primary--text font-weight-bold">目標一覧</p>
        <GoalList :goals="goals" />
      </v-col>
      <!-- 学習状況 PCはこっち -->
      <v-col v-show="_isPC" class="mt-5">
        <p class="text-h5 primary--text font-weight-bold mb-0">学習状況</p>
        <CommitsFlower :commits-by-monthly="commitsByMonthly" />
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
import { userStore } from '@/store'
import CommitsFlower from '@/components/organisms/profile/CommitsFlower.vue'
import CommitsFlowerSP from '@/components/organisms/profile/CommitsFlowerSP.vue'
import CommitsTable from '@/components/organisms/profile/CommitsTable.vue'
import GoalList from '@/components/organisms/profile/GoalList.vue'
import UserInfo from '@/components/organisms/profile/UserInfo.vue'
import {
  GoalSerializer,
  MonthlyCount,
  CommitsSummary,
  UserSerializer
} from '@/openapi'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsFlower,
    CommitsFlowerSP,
    CommitsTable,
    GoalList,
    UserInfo
  },
  computed: {
    user(): UserSerializer | null {
      return userStore.userGetter
    },
    commitSummary(): CommitsSummary {
      return userStore.commitSummaryGetter
    },
    goals(): GoalSerializer[] {
      return userStore.goalsGetter
    },
    commitsByMonthly(): MonthlyCount[] {
      return userStore.commitByMonthlyGetter
    },
    goalSummary(): object | null {
      return userStore.goalSummaryGetter
    }
  },
  async created() {
    const userId: number = Number(this.$route.params.id)
    this._startLoading()

    // ユーザー情報の参照
    const { error, messages } = await userStore.getUser(userId)
    if (error && messages) {
      this._notifyyyy([
        {
          message: 'ユーザーが見つかりませんでした',
          type: 'warning'
        }
      ])
      this.$router.push('/profile')
    }

    Promise.all([
      // 該当ユーザーの目標の一覧
      userStore.getGoals(userId),
      // 該当ユーザーのコミットのサマリーを取得（合計記録数や合計の時間）
      userStore.getCommitSummary(userId),
      // 該当ユーザーの月ごとのコミットの数を取得
      userStore.getCommitsByMonth(userId),
      // 該当ユーザーの学習記録と目標の月ごとのサマリー取得
      userStore.getGoalCommitMonthlySummary(userId)
    ])

    this._finishLoading()
  }
})
</script>
