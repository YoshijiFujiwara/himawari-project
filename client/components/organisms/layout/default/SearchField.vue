<template>
  <v-menu v-model="menu" offset-y>
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="keyword"
        class="ml-6"
        hide-details
        append-icon="mdi-magnify"
        filled
        dense
        rounded
        v-on="on"
      ></v-text-field>
    </template>

    <v-card>
      <v-list>
        <v-list-item v-if="keyword">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
            {{ keyword }}
          </v-list-item-icon>
          <v-list-item-content>
            <div class="d-flex justify-end">
              <v-btn
                elevation="0"
                color="cardGreyBg"
                :to="`/search?keyword=${keyword}`"
              >
                全体から検索<v-icon>mdi-subdirectory-arrow-left</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
        <template v-if="filteredResult && filteredResult.users.length">
          <p class="mainText--text h4-text ml-3 mb-0 mt-3">ユーザー</p>
          <v-divider></v-divider>
          <!-- TODO: クリックしたらその人のプロフィールページへ飛ぶ機能を追加する -->
          <v-list-item
            v-for="(user, index) in filteredResult.users"
            :key="index + 'users'"
          >
            <v-list-item-avatar class="headline font-weight-light white--text">
              <v-img v-if="user.avatarUrl" :src="user.avatarUrl" />
              <svg
                v-else
                viewBox="0 0 640 640"
                v-html="jdenticonSvg(user.email)"
              ></svg>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="user.username"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-if="filteredResult && filteredResult.goals.length">
          <p class="mainText--text h4-text ml-3 mb-0 mt-3">目標</p>
          <v-divider></v-divider>
          <v-list-item
            v-for="(goal, index) in filteredResult.goals"
            :key="index + 'goals'"
            :to="`/goals/${goal.id}`"
          >
            <v-list-item-icon>
              <v-icon>{{
                goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline'
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="goal.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchSerializer } from '@/openapi'
import { searchStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      keyword: '',
      menu: false
    }
  },
  computed: {
    searchResult(): SearchSerializer | null {
      return searchStore.searchResultGetter
    },
    filteredResult(): SearchSerializer | null {
      if (!this.searchResult) return null
      if (!this.keyword) return this.searchResult
      return Object.assign(
        {},
        {
          users: this.searchResult.users.filter((u) =>
            u.username.includes(this.keyword)
          ),
          goals: this.searchResult.goals.filter((g) =>
            g.title.includes(this.keyword)
          )
        }
      )
    }
  },
  created() {
    searchStore.getSearchResult()
  }
})
</script>
