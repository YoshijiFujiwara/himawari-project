<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-row no-gutters>
            <v-col cols="2" class="searchListBg"></v-col>
            <v-col cols="10">
              <p class="font-weight-bold mainText--text text-h4 mt-4">
                「ひま」の検索結果：128件
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
              <SearchUserList v-if="userTabSelected" />
              <SearchGoalList v-if="goalTabSelected" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
      tab: 'user' as TabType
    }
  },
  computed: {
    userTabSelected(): boolean {
      return this.tab === 'user'
    },
    goalTabSelected(): boolean {
      return this.tab === 'goal'
    }
  },
  methods: {
    changeTab(tab: TabType) {
      this.tab = tab
    }
  }
})
</script>
