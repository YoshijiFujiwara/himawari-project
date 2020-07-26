<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-row no-gutters>
            <v-col cols="2" class="searchListBg"></v-col>
            <v-col cols="10">
              <p class="font-weight-bold mainText--text text-h4 mt-4">
                「{{ keyword }}」の検索結果：{{ users.length + goals.length }}件
              </p></v-col
            >
          </v-row>
          <v-row no-gutters>
            <!-- カラム1 -->
            <v-col cols="2" class="searchListBg">
              <v-btn
                text
                block
                class="py-7"
                :class="{ white: userTabSelected }"
                @click="changeTab('user')"
              >
                <v-icon :color="userTabSelected ? 'primary' : ''"
                  >mdi-account</v-icon
                >ユーザー
              </v-btn>
              <v-btn
                text
                block
                :class="{ white: goalTabSelected }"
                class="py-7"
                @click="changeTab('goal')"
              >
                <v-icon :color="goalTabSelected ? 'primary' : ''"
                  >mdi-flag</v-icon
                >目標
              </v-btn>
            </v-col>
            <!-- カラム2 -->
            <v-col cols="10">
              <SearchUserList v-if="userTabSelected" :users="users" />
              <SearchGoalList v-if="goalTabSelected" :goals="goals" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { searchStore } from '@/store'
import { UserSerializer, GoalSerializer } from '@/openapi'
import SearchUserList from '@/components/organisms/search/SearchUserList.vue'
import SearchGoalList from '@/components/organisms/search/SearchGoalList.vue'

type TabType = 'user' | 'goal'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    SearchUserList,
    SearchGoalList
  },
  data() {
    return {
      tab: 'user' as TabType,
      keyword: '' as string
    }
  },
  computed: {
    userTabSelected(): boolean {
      return this.tab === 'user'
    },
    goalTabSelected(): boolean {
      return this.tab === 'goal'
    },
    users(): UserSerializer[] {
      return searchStore.usersGetter
    },
    goals(): GoalSerializer[] {
      return searchStore.goalsGetter
    }
  },
  watch: {
    // このページでサイドnavbarでの検索をしたときなど
    $route() {
      this.search()
    }
  },
  async created() {
    await this.search()
  },
  methods: {
    changeTab(tab: TabType) {
      this.tab = tab
    },
    async search() {
      const keyword = this.$route.query.keyword
      if (keyword && typeof keyword === 'string') {
        this.keyword = keyword
      }
      await searchStore.getUsers(this.keyword)
      await searchStore.getGoals()
    }
  }
})
</script>
