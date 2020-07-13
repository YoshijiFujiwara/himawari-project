<template>
  <div>
    <v-row justify="start" no-gutter>
      <v-col cols="10" offset="1">
        <v-icon large color="black">
          mdi-eye
        </v-icon>
        <span class="pt-3">
          あなただけに表示されています。
        </span>
      </v-col>
      <v-col cols="10" offset="1">
        <p>
          <v-avatar> <img src="@/assets/himawari.png"/></v-avatar>
          <span class="font-weight-bold ml-4">ひまわり</span>
        </p>
        <p class="ml-16">
          タイムライン画面へようこそ！<br />
          ここでは記録した内容をグループにシェアしたり、シェアされた内容にコメントやリアクションすることができます！<br />
          さあ、目標を登録してグループでのシェアを始めよう！
        </p>
      </v-col>

      <v-col cols="9" offset="1">
        <v-card>
          <v-col v-for="n in 2" :key="n" cols="6">
            <v-select
              :items="goals"
              item-text="title"
              item-value="id"
              :label="`設定する目標${n}`"
              outlined
              max-width="80"
            ></v-select>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { GoalSerializer } from '@/openapi'

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    }
  }
})
</script>
