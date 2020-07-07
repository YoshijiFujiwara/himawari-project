<template>
  <v-card>
    <v-card-title class="headline">
      <v-icon large color="primary">mdi-account-box</v-icon>
      プロフィール編集
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="4">
            <v-img :src="require('@/assets/icon_sample.jpeg')">
              <v-row align="end" class="lightbox white--text fill-height">
                <v-col offset="10">
                  <v-file-input
                    label="avatar"
                    filled
                    hide-input
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/bmp"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-img>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col cols="4">
                <v-text-field label="ユーザー名" outlined dense required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="ステータスメッセージ" outlined></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-btn large color="primary" @click="onSubmit">
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

export default Vue.extend({
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    onSubmit() {
      alert('save profile')
    }
  }
})
</script>

<style></style>
