<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <GoalDetailHeader v-if="goal" :goal="goal" />
      <v-row justify="space-between mx-1 mt-3">
        <p class="text-h4 primary--text font-weight-bold">学習記録</p>
        <v-btn color="white" @click="createCommitDialog = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-row>
      <CommitsTable :commits="commits" />
      <v-dialog v-model="createCommitDialog" max-width="600px">
        <CreateCommitDialog
          :close-dialog="
            () => {
              createCommitDialog = false
            }
          "
        />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import GoalDetailHeader from '@/components/organisms/goals/index/GoalDetailHeader.vue'
import CreateCommitDialog from '@/components/organisms/goals/index/CreateCommitDialog.vue'
import CommitsTable from '@/components/organisms/goals/index/CommitsTable.vue'
import { GoalSerializer, CommitSerializer } from '@/openapi'

export default Vue.extend({
  layout: 'vuetify_default',
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
