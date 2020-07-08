<template>
  <v-card>
    <v-card-title class="headline">
      <v-icon large color="primary">mdi-account-box</v-icon>
      プロフィール編集
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="4">
            <v-img :src="require('@/assets/icon_sample.jpeg')" />
            <v-file-input
              v-model="form.image"
              label="プロフィール画像"
              outlined
              dense
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp"
              class="mt-5"
            ></v-file-input>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="form.username"
                  :rules="rules.username"
                  label="ユーザー名"
                  outlined
                  dense
                  required
                  class="mt-5"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.statusMessage"
                  label="ステータスメッセージ"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-btn large color="primary" :disabled="!valid" @click="onSubmit">
              プロフィールを保存する
            </v-btn>
          </v-col>
        </v-row>
        {{ form.image }}
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '../../../store'

export default Vue.extend({
  data() {
    return {
      valid: false,
      form: {
        username: '' as string,
        statusMessage: '' as string,
        image: (null as unknown) as File
      },
      rules: {
        username: [
          (v: string) => !!v || 'ユーザー名は必須です',
          (v: string) =>
            (v.length >= 5 && v.length <= 20) ||
            'ユーザー名は5文字以上、20文字以内で入力してください。'
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      await authStore.updateMe(this.form)
    }
  }
})
</script>

<style></style>
