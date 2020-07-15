<template>
  <v-timeline-item right="true" class="mainText--text mb-12">
    <template v-slot:icon>
      <v-avatar>
        <img src="http://i.pravatar.cc/64" />
      </v-avatar>
    </template>
    <template v-slot:opposite class="p-12">
      <span>mm:ss</span>
    </template>
    <h5 class="mb-5">
      ユーザーID:さんが目標を達成しました
    </h5>
    <v-card class="elevation-2 pb-5">
      <v-card-title class="headline"
        >APEXプレデター到達するぞ！！
        <span class="subtitle-1">
          を達成しました！おめでとうございます！
        </span>
        <v-spacer />
        <v-btn icon class="mb-12">
          <v-icon color="satisfyIcon">mdi-emoticon-outline</v-icon>
        </v-btn>
        <v-btn icon class="mb-12">
          <v-icon>mdi-reply</v-icon>
        </v-btn>
      </v-card-title>
      <v-row>
        <v-col cols="6">
          <v-card class="ml-15 mr-15">
            <v-row>
              <!-- <v-spacer /> -->
              <v-col align="center" justify="center">
                <v-col>
                  <v-icon x-large color="primary">mdi-timer-outline</v-icon>
                  <span class="headline">99h99m</span>
                </v-col>
                <v-col>
                  総学習時間
                </v-col>
              </v-col>
              <!-- <v-spacer /> -->
              <div class="my-5"><v-divider vertical /></div>
              <!-- <v-spacer /> -->
              <v-col align="center" justify="center">
                <v-col>
                  <v-icon x-large color="primary">mdi-pencil</v-icon>
                  <span class="headline">99</span>
                </v-col>
                <v-col text-xs-center>
                  総学習記録時間
                </v-col>
              </v-col>
              <!-- <v-spacer /> -->
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
