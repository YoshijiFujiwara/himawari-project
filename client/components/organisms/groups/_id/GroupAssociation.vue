<template>
  <div>
    <v-row justify="start">
      <v-col cols="10">
        <div class="ml-16">
          <v-icon large color="black">
            mdi-eye
          </v-icon>
          <span class="pt-3">
            あなただけに表示されています。
          </span>
        </div>
        <v-timeline align-top dense>
          <v-timeline-item>
            <template v-slot:icon>
              <v-avatar>
                <img src="@/assets/himawari.png" />
              </v-avatar>
            </template>
            <p class="font-weight-bold">ひまわり</p>
            <p class="">
              タイムライン画面へようこそ！<br />
              ここでは記録した内容をグループにシェアしたり、シェアされた内容にコメントやリアクションすることができます！<br />
              さあ、目標を登録してグループでのシェアを始めよう！
            </p>
            <v-card>
              <v-row v-for="n in 3" :key="n" class="ml-4 pt-6">
                <v-col cols="6">
                  <v-select
                    v-model="selectedGoalIds[n]"
                    :items="goals"
                    item-text="title"
                    item-value="id"
                    :label="`設定する目標${n}`"
                    outlined
                    max-width="80"
                  ></v-select> </v-col
                ><v-col>
                  <v-btn height="50" width="50" outlined @click="clearGoal">
                    <v-icon>mdi-window-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row class="ml-4">
                <v-col>
                  <v-btn color="primary" @click="onSubmit">保存する</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    {{ selectedGoalIds }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { GoalSerializer } from '@/openapi'

export default Vue.extend({
  data() {
    return {
      selectedGoalIds: {}
    }
  },
  computed: {
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    }
    // いったん選んだ消えるのはなかったことに
    // selected(): GoalSerializer[] {
    //   return this.goals.filter((goal) => {
    //     return !Object.values(this.selectedGoalIds).includes(goal.id)
    //   })
    // }
  },
  methods: {
    clearGoal() {
      alert('選択解除')
    },
    onSubmit() {
      alert('保存しました')
    }
  }
})
</script>
