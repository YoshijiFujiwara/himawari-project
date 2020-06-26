<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="flex-start" vs-w="3">
        <UserInfo />
      </vs-col>
      <vs-row vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="9">
        <h2 class="section-title">目標一覧</h2>
        <GoalList />
        <vs-col
          vs-type="flex"
          vs-justify="flex-start"
          vs-align="center"
          vs-w="12"
        >
          <div>
            <h2 class="section-title">学習状況</h2>
            <CommitsSummary />
          </div>
        </vs-col>
        <h2 class="section-title">学習記録</h2>
        <CommitsTable />
      </vs-row>
    </vs-row>
  </div>
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
    this.$vs.loading()

    // ログインユーザー情報の参照
    await authStore.getMe()
    // 目標の一覧
    // await goalStore.getGoals()
    // 自分の学習記録一覧取得（全ての目標を跨ぐ）
    // await goalStore.getMyAllCommits()
    // コミットのサマリーを取得（合計記録数や合計の時間）
    // await goalStore.getCommitSummary()
    // 月ごとのコミットの数を取得
    await goalStore.getCommitsByMonthly()

    this.$vs.loading.close()
  }
})
</script>

<style lang="scss" scoped>
.section-title {
  color: #54a9fe;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
</style>
