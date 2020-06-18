<template>
  <div>
    <div class="content">
      <GoalDetailHeader :goal="goal" />
      <h2 class="study-record">学習記録</h2>
      <CommitsTable :commits="commits" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import GoalDetailHeader, {
  Goal
} from '@/components/organisms/goals/index/GoalDetailHeader.vue'
import CommitsTable, {
  Commit
} from '@/components/organisms/goals/index/CommitsTable.vue'
import { GoalSerializer } from '@/openapi'

type Data = {
  goal: Goal
  commits: Commit[]
}
export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsTable,
    GoalDetailHeader
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
      ]
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
.content {
  margin: auto;
  width: 66%;
}
.study-record {
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: #54a9fe;
}
</style>
