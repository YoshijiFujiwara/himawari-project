<template>
  <v-card class="py-4">
    <v-card-title>
      <v-icon large left color="primary">
        mdi-flag
      </v-icon>
      <span class="title">新しい目標を作成する</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-row justify="center" class="mt-5">
      <v-col cols="10">
        <v-form v-model="valid">
          <v-text-field
            v-model="form.title"
            label="目標"
            :rules="rules.title"
            outlined
            required
            max-width="100"
          >
          </v-text-field>
          <v-textarea
            v-model="form.description"
            label="目標について"
            outlined
          ></v-textarea>
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
          <v-divider class="mb-8"></v-divider>
          <v-btn
            large
            color="primary"
            :disabled="!valid"
            :block="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
            @click="onSubmit"
            >目標を作成する</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CreateGoalDto } from '@/openapi'

type Data = {
  form: CreateGoalDto
}
export default Vue.extend({
  middleware: 'authenticated',
  data() {
    return {
      valid: false,
      form: {
        title: '',
        description: '',
        isPublic: false
      },
      rules: {
        title: [
          (v: string) => !!v || '目標は必須です',
          (v: string) =>
            (v && v.length <= 20) || '目標は20文字以内で入力してください'
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      this.startLoading()
      const { res, error, messages } = await goalStore.addGoal(this.form)
      this.finishLoading()

      if (!error) {
        this.$router.push(`/goals/${res.data.id}`)
      } else if (error && messages) {
        this.notifyyyy(
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
