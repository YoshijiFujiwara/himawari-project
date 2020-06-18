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
import GoalDetailHeader, {
  Goal
} from '@/components/organisms/goals/index/GoalDetailHeader.vue'
import CommitsTable, {
  Commit
} from '@/components/organisms/goals/index/CommitsTable.vue'

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
      goal: {
        title: 'TOEICで800点以上',
        description:
          '目標作成ページの「目標について」の内容が表示されます。目標作成ページの「目標について」の内容が表示されます。\n目標作成ページの「目標について」の内容が表示されます。目標作成ページの「目標について」の内容が表示されます。\n目標作成ページの「目標について」の内容が表示されます。目標作成ページの「目標について」の内容が表示されます。'
      },
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
