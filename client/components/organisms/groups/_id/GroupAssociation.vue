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
          <v-card-text>
            <p>aaaaaaaaaaaa</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {}
})
</script>
