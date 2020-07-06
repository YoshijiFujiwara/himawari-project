<template>
  <v-row justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="n in 4"
          :key="n"
          right="true"
          class="mainText--text mb-12"
        >
          <template v-slot:icon>
            <v-avatar>
              <img src="http://i.pravatar.cc/64" />
            </v-avatar>
          </template>
          <template v-slot:opposite class="p-12">
            <span>mm:ss</span>
          </template>
          <h5 class="mb-5">
            username2 さんが 「目標タイトル」に 学習を記録しました。
          </h5>
          <v-card class="elevation-2">
            <v-card-title class="headline"
              >TOEICで800点とるぞ！<v-spacer />
              <span><v-icon>mdi-timer-outline</v-icon> 99h99m</span>
              <v-btn icon class="mb-12">
                <v-icon>mdi-emoticon-outline</v-icon>
              </v-btn>
              <v-btn icon class="mb-12">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              学習の記録内容が表示されます。
              学習の記録内容が表示されます。学習の記録内容が表示されます。
              学習の記録内容が表示されます。学習の記録内容が表示されます。学習の記録内容が表示されます。
              学習の記録内容が表示されます。学習の記録内容が表示されます。
              学習の記録内容が表示されます。
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'authenticated'
})
</script>
