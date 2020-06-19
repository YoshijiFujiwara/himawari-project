<template>
  <vs-row vs-type="flex" vs-justify="center">
    <vs-col vs-w="8">
      <GoalDetailHeader :goal="goal" />
      <vs-row vs-w="12" vs-type="flex" vs-justify="space-between">
        <h2 class="study-record">学習記録</h2>
        <vs-button
          color="dark"
          icon="add"
          type="border"
          @click="createCommitModalOpen = true"
        ></vs-button>
      </vs-row>
      <vs-divider></vs-divider>
      <CommitsTable :commits="commits" />
      <CreateCommitDialog
        v-model="createCommitModalOpen"
        :select-items="selectItems"
      />
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import GoalDetailHeader from '@/components/organisms/goals/index/GoalDetailHeader.vue'
import CreateCommitDialog from '@/components/organisms/goals/index/CreateCommitDialog.vue'
import CommitsTable from '@/components/organisms/goals/index/CommitsTable.vue'
import { GoalSerializer, CommitSerializer } from '@/openapi'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsTable,
    GoalDetailHeader,
    CreateCommitDialog
  },
  data() {
    return {
      createCommitModalOpen: false
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

    this.$vs.loading()
    // 自分の目標一覧を取得
    let result = await goalStore.getGoals()
    if (result.error && result.messages) {
      this.notify({
        messages: result.messages,
        color: 'warning'
      })
      // TODO: 404ページへ遷移。とりあえずprofileページへ
      this.$router.push('/profile')
    }

    // このページの目標詳細情報取得
    result = await goalStore.getGoal(Number(goalId))
    if (result.error && result.messages) {
      this.notify({
        messages: result.messages,
        color: 'warning'
      })
      // TODO: 404ページへ遷移。とりあえずprofileページへ
      this.$router.push('/profile')
    }
    this.$vs.loading.close()
  }
})
</script>

<style lang="scss" scoped>
.study-record {
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: #54a9fe;
}
</style>
