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
              <v-divider></v-divider>

              <v-list v-if="goalTabSelected" rounded>
                <v-subheader>Labels</v-subheader>
                <v-list-item-group v-model="selectedLabelIndex" color="primary">
                  <v-list-item v-for="(label, index) in labels" :key="index">
                    <v-list-item-icon class="mr-0">
                      <v-icon small :color="label.color">mdi-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="label.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <!-- カラム2 -->
            <v-col cols="10">
              <SearchUserList v-if="userTabSelected" :users="users" />
              <SearchGoalList v-if="goalTabSelected" :goals="filteredGoals" />
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
import {
  UserSerializer,
  GoalSerializer,
  GoalSerializerLabelEnum
} from '@/openapi'
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
      keyword: '' as string,
      selectedLabelIndex: undefined,
      labels: [
        { title: GoalSerializerLabelEnum.CHALLENGING, color: 'orange' },
        { title: GoalSerializerLabelEnum.ACHIEVEMENT, color: 'green' },
        { title: GoalSerializerLabelEnum.GIVEUP, color: 'grey' }
      ]
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
    },
    filteredGoals(): GoalSerializer[] {
      if (typeof this.selectedLabelIndex === 'undefined') {
        return this.goals
      }
      const filterLabel = this.labels[this.selectedLabelIndex!].title
      return this.goals.filter((g) => g.label === filterLabel)
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
