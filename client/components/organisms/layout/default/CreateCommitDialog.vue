<template>
  <v-card>
    <v-card-title>
      <span class="headline">
        <v-icon color="primary">mdi-pencil</v-icon>
        学習を記録する
      </span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col class="d-flex" cols="12">
              <v-select
                v-model="form.goalId"
                :items="goals"
                :rules="rules.goalId"
                item-text="title"
                item-value="id"
                label="目標"
                outlined
                max-width="100"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.title"
                label="学習名"
                :rules="rules.title"
                outlined
                required
                max-width="100"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="menu"
                v-model="timePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.time"
                    label="学習時間"
                    append-icon="mdi-timer-outline"
                    :rules="rules.time"
                    readonly
                    v-bind="attrs"
                    outlined
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timePicker"
                  v-model="form.time"
                  full-width
                  format="24hr"
                  @click:minute="$refs.menu.save(form.time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="form.description"
                label="学習内容"
                outlined
                height="120px"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-btn
                large
                color="primary"
                :disabled="!valid"
                :block="_isSP"
                @click="onSubmit"
                >学習を記録する</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CreateCommitDto, GoalSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    closeDialog: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      createCommitModalOpen: true,
      form: {
        goalId: null,
        title: '',
        description: '',
        time: '00:00'
      },
      rules: {
        goalId: [(v: number) => !!v || '目標は必須です'],
        title: [
          (v: string) => !!v || '学習名は必須です',
          (v: string) =>
            (v && v.length <= 20) || '学習名は20文字以内で入力してください'
        ],
        time: [
          (v: string) => !!v || '学習時間は必須です',
          (v: string) => v !== '00:00' || '学習時間は1分以上で入力してください'
        ]
      },
      timePicker: false
    }
  },
  computed: {
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    }
  },
  methods: {
    async onSubmit() {
      const createCommitDto: CreateCommitDto = {
        title: this.form.title,
        description: this.form.description || '',
        studyHours: Number(this.form.time.split(':')[0]),
        studyMinutes: Number(this.form.time.split(':')[1])
      }
      const { error, messages } = await goalStore.createCommit({
        goalId: this.form.goalId!,
        createCommitDto
      })
      if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      } else {
        this.closeDialog()
        this.form.title = ''
        this.form.description = ''
        this.form.time = '00:00'
        this.$router.push(`/goals/${this.form.goalId}`)
        this._notifyyyy([
          {
            message: '学習記録を登録しました',
            type: 'success'
          }
        ])
      }
    }
  }
})
</script>
