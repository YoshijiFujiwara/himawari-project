<template>
  <v-autocomplete
    v-model="autocomplete"
    class="ml-6"
    :items="autocompleteItem"
    :loading="loading"
    :search-input.sync="search"
    dense
    label="Search"
    filled
    rounded
    hide-details
    item-text="name"
    item-value="name"
  >
    <template v-slot:selection="{ attr, on, item }">
      <v-icon left>mdi-coin</v-icon>
      <span v-text="item.name"></span>
    </template>
    <!-- 検索結果が無い、もしくはデータ取得ができないとき表示 -->
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          一致するものがないか見つかりません
          <strong>🥺ぴえん🥺</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <!-- 検索するデータ群 -->
    <template v-slot:item="{ item }">
      <v-list-item-avatar
        v-if="item.group === 'user'"
        class="headline font-weight-light white--text"
      >
        <v-img v-if="item.avatarUrl" :src="Iam.avatarUrl" />
        <svg
          v-else
          viewBox="0 0 640 640"
          v-html="jdenticonSvg(item.name)"
        ></svg>
      </v-list-item-avatar>
      <v-list-item-icon v-else>
        <v-icon v-if="item.isPublic">mdi-earth</v-icon>
        <v-icon v-else>mdi-lock-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-html="item.name"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdi-coin</v-icon>
      </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      autocompleteItem: [
        { header: 'ユーザー' },
        {
          name: 'ニャンコ先生',
          avatarUrl:
            'https://res.cloudinary.com/db32y726v/image/upload/v1594956272/llry2sr3t4gnpsifyofe.jpg',
          group: 'user'
        },
        { name: 'Ali Connors', avatarUrl: '', group: 'user' },
        { name: 'Trevor Hansen', avatarUrl: '', group: 'user' },
        { name: 'Tucker Smith', avatarUrl: '', group: 'user' },
        { divider: true },
        { header: '目標' },
        { name: '目標サンプル1', isPublic: true, group: 'goals' },
        { name: '目標サンプル2 ', isPublic: false, group: 'goals' },
        { name: 'John Smith', isPublic: false, group: 'goals' },
        { name: 'Sandra Williams', isPublic: true, group: 'goals' }
      ],
      autocomplete: null,
      search: null,
      select: null,
      loading: false
    }
  }
})
</script>

<style></style>
