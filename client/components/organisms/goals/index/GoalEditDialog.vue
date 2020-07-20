<template>
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
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style></style>
