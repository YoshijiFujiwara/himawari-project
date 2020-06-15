<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <h1>ユーザ名｜{{ goal.title }}</h1>
        <p class="goal-about">
          {{ goal.description }}
        </p>
        <h2 class="study-record">学習記録</h2>
        <vs-card class="cardx" fixed-height>
          <div>
            <vs-list>
              <vs-list-item title="yyyy年mm月dd日"></vs-list-item>
              <vs-collapse v-for="(commit, i) in commits" :key="i" accordion>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">
                      {{ commit.name }}
                    </p>
                    <span class="study-time">{{ commit.spendTime }}</span>
                  </div>
                  {{ commit.description }}
                  <br /><br />
                </vs-collapse-item>
              </vs-collapse>
              <vs-list-item title="yyyy年mm月dd日"></vs-list-item>
              <vs-collapse v-for="(commit, i) in commits" :key="i" accordion>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">
                      {{ commit.name }}
                    </p>
                    <span class="study-time">{{ commit.spendTime }}</span>
                  </div>
                  {{ commit.description }}
                  <br /><br />
                </vs-collapse-item>
              </vs-collapse>
              <vs-list-item title="yyyy年mm月dd日"></vs-list-item>
              <vs-collapse v-for="(commit, i) in commits" :key="i" accordion>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">
                      {{ commit.name }}
                    </p>
                    <span class="study-time">{{ commit.spendTime }}</span>
                  </div>
                  {{ commit.description }}
                  <br /><br />
                </vs-collapse-item>
              </vs-collapse>
            </vs-list>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

type Commit = {
  name: string
  description: string
  spendTime: string
}
type Data = {
  goal: {
    title: string
    description: string
  }
  commits: Commit[]
}

export default Vue.extend({
  data(): Data {
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
        }
      ]
    }
  }
})
</script>
<style>
.wrapper {
  height: 100%;
  width: 100%;
  background-color: #eff7ff;
}
.content {
  margin: auto;
  width: 66%;
}
.goal-about {
  font-size: 22px;
  text-align: left;
  color: #707070;
}
.study-record {
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: #54a9fe;
}
.cardx {
  margin: auto;
}
.study-time {
  color: #2c2c2c;
  font-size: 12px;
}
.small-goal {
  font-size: 16px;
}
</style>
