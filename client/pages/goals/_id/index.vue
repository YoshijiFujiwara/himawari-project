<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <GoalDetailHeader v-if="goal" :goal="goal" :commits="commits" />
      <v-row justify="space-between" class="mx-1 mt-3">
        <p class="text-h4 primary--text font-weight-bold">学習記録</p>
        <v-btn color="white" @click="createCommitDialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
      <CommitsTable
        v-if="goal"
        ref="commitsTable"
        :commits="commits"
        :goal="goal"
        :create-commit-dialog="createCommitDialog"
        @close="createCommitDialog = false"
      />
    </v-col>
    <CreateCommitDialog
      v-model="createCommitDialog"
      :init-display-condition="initDisplayCondition"
    />
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import GoalDetailHeader from '@/components/organisms/goals/index/GoalDetailHeader.vue'
import CommitsTable from '@/components/organisms/goals/index/CommitsTable.vue'
import { GoalSerializer, CommitSerializer } from '@/openapi'
import CreateCommitDialog from '@/components/organisms/goals/index/CreateCommitDialog.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsTable,
    GoalDetailHeader,
    CreateCommitDialog
  },
  data() {
    return {
      createCommitDialog: false
    }
  },
  computed: {
    goal(): GoalSerializer | null {
      return goalStore.goalGetter
    },
    commits(): CommitSerializer[] {
      return [...goalStore.commitsGetter].reverse()
    },
    selectItems() {
      return [
        ...goalStore.goalsGetter.map((g) => ({ text: g.title, value: g.id }))
      ]
    }
  },
  async created() {
    const goalId = this.$route.params.id

    this._startLoading()
    // 自分の目標一覧を取得
    let result = await goalStore.getGoals()
    if (result.error && result.messages) {
      this._notifyyyy(
        result.messages.map((message: string) => ({
          message,
          type: 'warning'
        }))
      )
      // TODO: 404ページへ遷移。とりあえずprofileページへ
      this.$router.push('/profile')
    }

    // このページの目標詳細情報取得
    result = await goalStore.getGoal(Number(goalId))
    if (result.error && result.messages) {
      this._notifyyyy(
        result.messages.map((message: string) => ({
          message,
          type: 'warning'
        }))
      )
      // TODO: 404ページへ遷移。とりあえずprofileページへ
      this.$router.push('/profile')
    }
    this._finishLoading()
  },
  methods: {
    initDisplayCondition() {
      const commitsTable = this.$refs.commitsTable as any
      commitsTable.initDisplayCondition()
    }
  }
})
</script>
