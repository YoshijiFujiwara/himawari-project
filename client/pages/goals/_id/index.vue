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
          class="add_btn"
          @click="createCommitModalOpen = true"
        ></vs-button>
      </vs-row>
      <vs-divider></vs-divider>
      <CommitsTable :commits="commits" />
      <CreateCommitDialog v-model="createCommitModalOpen" />
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import GoalDetailHeader from '@/components/organisms/goals/index/GoalDetailHeader.vue'
import CreateCommitDialog from '@/components/organisms/goals/index/CreateCommitDialog.vue'
import CommitsTable from '@/components/organisms/goals/index/CommitsTable.vue'
import { GoalSerializer } from '@/openapi'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsTable,
    GoalDetailHeader,
    CreateCommitDialog
  },
  data() {
    return {
      commits: [
        {
          name: '学習A',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習B',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習C',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習A',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習B',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習C',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習A',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習B',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習C',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習A',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習B',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        },
        {
          name: '学習C',
          description: '勉強の記録が表示されます',
          spendTime: '3時間30分'
        }
      ],
      createCommitModalOpen: false
    }
  },
  computed: {
    goal(): GoalSerializer | null {
      return goalStore.goalsGetter
    }
  },
  async created() {
    const goalId = this.$route.params.id

    this.$vs.loading()
    const { error, messages } = await goalStore.getGoal(Number(goalId))
    if (error && messages) {
      this.notify({
        messages,
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
.add_btn {
  width: 60.5px !important;
  height: 44.6px !important;
  background-color: white !important;
}
</style>
