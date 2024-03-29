<template>
  <div>
    <v-row justify="start">
      <v-col cols="11" md="10">
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
            <v-card class="pt-6">
              <v-row v-for="n in numberOfInputs" :key="n" class="ml-4 mb-n5">
                <v-col cols="9" md="6">
                  <v-select
                    v-model="selectedGoalIds[n]"
                    :items="
                      goals.filter((g) => {
                        return (
                          !Object.values(selectedGoalIds).includes(g.id) ||
                          g.id === selectedGoalIds[n]
                        )
                      })
                    "
                    item-text="title"
                    item-value="id"
                    label="設定する目標"
                    outlined
                    max-width="80"
                  ></v-select>
                </v-col>
                <v-col v-show="!!selectedGoalIds[n]" cols="1">
                  <v-btn height="50" width="50" outlined @click="clearGoal(n)">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore, groupStore } from '@/store'
import { GoalSerializer, GroupSerializer } from '@/openapi'

export default Vue.extend({
  data() {
    return {
      selectedGoalIds: {} as { [key: number]: number }
    }
  },
  computed: {
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    },
    group(): GroupSerializer | null {
      return groupStore.groupGetter
    },
    numberOfInputs(): number {
      return Object.values(this.selectedGoalIds).filter(Boolean).length + 1
    }
  },
  watch: {
    group() {
      if (
        this.Iam &&
        groupStore.groupGetter &&
        groupStore.groupGetter.goals!.length &&
        Object.values(this.selectedGoalIds).length === 0
      ) {
        const myGoals = groupStore.groupGetter.goals!.filter(
          (goal) => goal.userId === this.Iam.id
        )
        const goalIds: { [key: number]: number } = {}
        myGoals.forEach((goal, index) => {
          goalIds[index + 1] = goal.id
        })
        this.selectedGoalIds = goalIds
      }
    }
  },
  methods: {
    clearGoal(inputNumber: number) {
      this.selectedGoalIds = Object.assign(
        {},
        this.deleteAndShift(this.selectedGoalIds, inputNumber)
      )
    },
    async onSubmit() {
      this._startLoading()
      const { error, messages } = await groupStore.bulkAssignGoals({
        groupId: Number(this.$route.params.id),
        bulkAssignGoalsDto: {
          goalIds: Object.values(this.selectedGoalIds)
        }
      })
      this._finishLoading()

      if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      } else {
        this._notifyyyy([
          {
            message: '紐づける目標を更新しました',
            type: 'success'
          }
        ])
      }
    },
    deleteAndShift(object: any, key: number) {
      delete object[key]
      while (++key in object) {
        object[key - 1] = object[key]
        delete object[key]
      }
      return object
    }
  }
})
</script>
