<template>
  <v-autocomplete
    v-model="autocomplete"
    class="ml-6"
    :items="items"
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
    <template v-slot:selection="{ item }">
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
          v-html="jdenticonSvg(item.email)"
        ></svg>
      </v-list-item-avatar>
      <v-list-item-icon v-else>
        <v-icon v-if="item.isPublic">mdi-earth</v-icon>
        <v-icon v-else>mdi-lock-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchSerializer } from '@/openapi'
import { searchStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      autocomplete: null,
      search: null,
      select: null,
      loading: false,
      autocompleteItem: []
    }
  },
  computed: {
    searchResult(): SearchSerializer | null {
      return searchStore.searchResultGetter
    },
    items(): any {
      const users = this.searchResult
        ? this.searchResult.users.map((u) => {
            return {
              name: u.username,
              avatarUrl: u.avatarUrl,
              email: u.email,
              group: 'user'
            }
          })
        : []
      const goals = this.searchResult
        ? this.searchResult.goals.map((g) => {
            return {
              name: g.title,
              isPublic: g.isPublic,
              group: 'goals'
            }
          })
        : []

      return [
        { header: 'ユーザー' },
        ...users,
        { divider: true },
        { header: '目標' },
        ...goals
      ]
    }
  },
  async created() {
    await searchStore.getSearchResult()
  },
  methods: {}
})
</script>

<style></style>
