<template>
  <div>
    <div class="content">
      <h1>ユーザ名｜{{ goal.title }}</h1>
      <p class="goal-about">
        {{ goal.description }}
      </p>
      <h2 class="study-record">学習記録</h2>
      <vs-card class="cardx" fixed-height>
        <vs-table :data="commits">
          <template slot="header">
            <h3>
              yyyy年mm月dd日
            </h3>
          </template>
          <template slot-scope="{ data }">
            <vs-tr v-for="(tr, indextr) in data" :key="indextr" :data="tr">
              <vs-td :data="tr.name" class="table-commit-name">
                <vs-icon icon="edit" color="primary"></vs-icon>
                {{ tr.name }}<br />
                {{ tr.spendTime }}
              </vs-td>
              <vs-td class="table-action-buttons">
                <vs-button type="flat" color="warning" icon="mood"></vs-button>
                <vs-button
                  type="flat"
                  color="dark"
                  icon="delete_outline"
                ></vs-button>
              </vs-td>
              <template slot="expand">
                <div>{{ tr.description }}hoho</div></template
              >
            </vs-tr>
          </template>
        </vs-table>
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
.table-action-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
