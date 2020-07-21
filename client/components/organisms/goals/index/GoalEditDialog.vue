<template>
  <v-dialog v-model="dialog" max-width="1000">
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
            <v-textarea
              v-model="form.description"
              label="目標について"
              outlined
            ></v-textarea>
            <v-divider></v-divider>
            <p class="text-subtitle-2 mt-5 ml-3 font-weight-bold">
              ラベル
            </p>
            <v-radio-group v-model="form.label">
              <v-radio
                class="text-h6 mb-4 font-weight-bold"
                label="Challenging"
                color="orange"
                :value="UpdateGoalDtoLabelEnum.CHALLENGING"
              ></v-radio>
              <v-radio
                class="text-h6 mb-4 font-weight-bold"
                label="Achievement"
                color="green"
                :value="UpdateGoalDtoLabelEnum.ACHIEVEMENT"
              ></v-radio>
              <v-radio
                class="text-h6 mb-2 font-weight-bold"
                label="GiveUp"
                color="gray"
                :value="UpdateGoalDtoLabelEnum.GIVEUP"
              ></v-radio>
            </v-radio-group>
            <v-divider></v-divider>
            <v-radio-group v-model="form.isPublic">
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
              <v-btn large color="primary" :block="_isSP" @click="onSubmit">
                目標を保存する
              </v-btn>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<!-- いろいろ追加 -->
<script lang="ts">
import Vue, { PropType } from 'vue'
import { goalStore } from '@/store'
import { GoalSerializer, UpdateGoalDtoLabelEnum } from '@/openapi'

export default Vue.extend({
  data() {
    return {
      form: {
        description: '',
        label: '',
        isPublic: false
      },
      UpdateGoalDtoLabelEnum
    }
  },
  created() {
    this.form.description = this.goal.description || ''
    this.form.label = this.goal.label
    this.form.isPublic = this.goal.isPublic
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    goal: {
      type: Object as PropType<GoalSerializer>,
      required: true
    }
  },
  computed: {
    dialog: {
      get(): boolean {
        return this.value
      },
      set(dialog: boolean) {
        this.$emit('input', dialog)
      }
    }
  },
  methods: {
    async onSubmit() {
      this._startLoading()
      const { res, error, messages } = await goalStore.updateGoal({
        id: this.goal.id,
        updateGoalDto: {
          title: this.goal.title,
          description: this.form.description,
          isPublic: this.form.isPublic,
          label: this.form.label as UpdateGoalDtoLabelEnum
        }
      })
      this._finishLoading()

      if (!error) {
        this.$router.push(`/goals/${res.data.id}`)
      } else if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      }
    }
  }
})
</script>
