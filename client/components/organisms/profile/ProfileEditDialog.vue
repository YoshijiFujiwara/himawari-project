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
          <v-col cols="12" md="4" class="pb-0">
            <v-img
              v-if="Iam.avatarUrl && !uploadImageUrl"
              :src="Iam.avatarUrl"
            />
            <v-img v-else-if="uploadImageUrl" :src="uploadImageUrl" />
            <svg
              v-else
              viewBox="0 0 640 640"
              v-html="jdenticonSvg(Iam.email)"
            ></svg>
            <v-file-input
              v-model="form.image"
              label="プロフィール画像"
              outlined
              dense
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp"
              class="mt-5"
              @change="onImagePicked"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="8" class="py-0">
            <v-row>
              <v-col cols="12" md="5" class="pt-0">
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
              <v-col cols="12" class="pb-0">
                <v-textarea
                  v-model="form.statusMessage"
                  label="ステータスメッセージ"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12">
            <v-btn
              large
              color="primary"
              :disabled="!valid"
              :block="_isSP"
              @click="onSubmit"
            >
              プロフィールを保存する
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store'

export default Vue.extend({
  props: {
    closeFunction: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      form: {
        username: '' as string,
        statusMessage: '' as string,
        image: (null as unknown) as File
      },
      rules: {
        username: [(v: string) => !!v || 'ユーザー名は必須です']
      },
      uploadImageUrl: ''
    }
  },
  created() {
    this.form.username = this.Iam.username
    this.form.statusMessage = this.Iam.statusMessage || ''
  },
  methods: {
    async onSubmit() {
      this._startLoading()
      const { error, messages } = await authStore.updateMe(this.form)
      this._finishLoading()

      if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      } else {
        this.closeFunction()
        this._notifyyyy([
          {
            message: 'プロフィールの更新が完了しました。',
            type: 'success'
          }
        ])
      }
    },
    onImagePicked(file: File) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          if (typeof fr.result === 'string') {
            this.uploadImageUrl = fr.result
          }
        })
      } else {
        this.uploadImageUrl = ''
      }
    }
  }
})
</script>

<style></style>
