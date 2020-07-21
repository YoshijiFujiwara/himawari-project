<template>
  <div>
    <v-list v-for="n in 10" :key="n" class="elevation-1">
      <v-list-item>
        <v-list-item-icon>
          <v-avatar color="indigo"> </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ユーザーネーム</v-list-item-title>
          <v-list-item-subtitle class="mt-2">
            プロフィールの「ステータスメッセージ」が表示されます。プロフィールの「ステータスメッセージ」が表示されます。
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-2">
            <div>
              <span class="mr-3">
                <v-icon color="primary">mdi-timer-outline</v-icon>99h99m
              </span>
              <span><v-icon color="primary">mdi-flag</v-icon>99</span>
              <span><v-icon color="primary">mdi-pencil</v-icon>999</span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({})
</script>
