<template>
  <div>
    <div class="d-flex justify-space-between align-center pt-5">
      <p class="text-h4 font-weight-bold text-no-wrap">
        <v-icon v-show="_isPC" large>
          {{ !!goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline' }}
        </v-icon>
        {{ _isPC ? goal.title : '' }}
        <v-chip class="ma-2" color="chipBg">
          <v-icon left color="challengingColor">mdi-fire</v-icon>
          Challenging
        </v-chip>
        <v-btn icon @click="goalEditDialog = true">
          <v-icon midium>mdi-cog</v-icon>
        </v-btn>
        <v-dialog v-model="goalEditDialog" max-width="1000">
          <GoalEditDialog />
          <v-card>
            <v-card-title>
              <span class="headline">
                <v-icon large>{{
                  !!goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline'
                }}</v-icon>
                {{ goal.title }}
              </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-row justify="center" class="mt-5">
              <v-col cols="10">
                <v-form>
                  <v-textarea label="目標について" outlined></v-textarea>
                  <v-divider></v-divider>
                  <p class="text-subtitle-2 mt-3 ml-3 font-weight-bold">
                    ラベル
                  </p>
                  <v-radio-group v-model="radios" :mandatory="false">
                    <v-radio
                      class="text-h6 mb-3 font-weight-bold"
                      label="Challenging"
                      color="orange"
                      value="Challenging"
                    ></v-radio>
                    <v-radio
                      class="text-h6 mb-3 font-weight-bold"
                      label="Achievement"
                      color="green"
                      value="Achievement"
                    ></v-radio>
                    <v-radio
                      class="text-h6 mb-3 font-weight-bold"
                      label="GiveUp"
                      color="gray"
                      value="GiveUp"
                    ></v-radio>
                  </v-radio-group>
                  <v-divider></v-divider>
                  <v-radio-group>
                    <v-radio :value="true">
                      <div slot="label" class="d-flex">
                        <v-icon x-large class="mr-4">mdi-earth</v-icon>
                        <div class="d-flex flex-column">
                          <p class="text-h6 mb-0 font-weight-bold">公開</p>
                          <p>
                            誰でもこの目標を見ることができます。目標を公開にして、みんなと応援し合いましょう！
                          </p>
                        </div>
                      </div>
                    </v-radio>
                    <v-radio :value="false">
                      <div slot="label" class="d-flex">
                        <v-icon x-large class="mr-4">mdi-lock-outline</v-icon>
                        <div class="d-flex flex-column">
                          <p class="text-h6 mb-0 font-weight-bold">非公開</p>
                          <p>
                            この目標はあなたもしくは、グループメンバーしか見ることができません。
                          </p>
                        </div>
                      </div>
                    </v-radio>
                  </v-radio-group>
                  <v-divider></v-divider>
                  <v-col cols="12">
                    <v-btn
                      large
                      color="primary"
                      :disabled="!valid"
                      :block="_isSP"
                      @click="onSubmit"
                    >
                      目標を保存する
                    </v-btn>
                  </v-col>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </p>
      <div class="d-flex justify-end">
        <p class="mr-4">
          <v-icon color="primary">mdi-timer-outline</v-icon
          >{{ totalTime | toJPHm }}
        </p>
        <p><v-icon color="primary">mdi-pencil</v-icon>{{ commits.length }}</p>
      </div>
    </div>
    <v-divider class="mb-4"></v-divider>
    <p v-show="_isSP" class="text-h4 primary--text font-weight-bold">
      目標について
    </p>
    <p class="text-subtitle-1">{{ goal.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GoalSerializer, CommitSerializer } from '@/openapi'
// import GoalEditDialog from '@/components/organisms/goals/index/GoalEditDialog.vue'

export default Vue.extend({
  // components: {
  //   GoalEditDialog
  // },
  props: {
    goal: {
      type: Object as PropType<GoalSerializer>,
      required: true
    },
    commits: {
      type: Array as PropType<CommitSerializer[]>,
      required: true
    }
  },
  data() {
    return {
      goalEditDialog: false
    }
  },
  computed: {
    totalTime(): string {
      let totalTime = 0
      this.commits.forEach((c) => {
        totalTime +=
          Number(c.studyHours) * 60 * 60 + Number(c.studyMinutes) * 60
      })
      return this.secondsToHm(totalTime)
    }
  },
  methods: {
    secondsToHm(d: number): string {
      const h = Math.floor(d / 3600)
      const m = Math.floor((d % 3600) / 60)

      return `${h}:${m}`
    },
    closeEditDialog() {
      this.goalEditDialog = false
    }
  }
})
</script>
