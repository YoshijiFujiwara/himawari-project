<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card>
          <v-row no-gutters>
            <v-col cols="2" class="searchListBg"></v-col>
            <v-col cols="10">
              <p class="font-weight-bold mainText--text">
                「ひま」の検索結果：128件
              </p></v-col
            >
          </v-row>
          <v-row no-gutters>
            <!-- カラム1 -->
            <v-col cols="2" class="searchListBg">
              <v-col :class="{ white: isUserTabVisible }">
                <v-btn text block @click="toggleUserList">
                  <v-icon color="primary">mdi-account</v-icon>ユーザー
                </v-btn>
              </v-col>
              <v-col :class="{ white: isgoalTabVisible }">
                <v-btn text block @click="toggleGoalList">
                  <v-icon>mdi-flag</v-icon>目標
                </v-btn>
              </v-col>
            </v-col>
            <!-- カラム2 -->
            <v-col cols="10">
              <SearchUserList v-if="isUserTabVisible" />
              <SearchGoalList v-if="isgoalTabVisible" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import SearchUserList from '@/components/organisms/search/SearchUserList.vue'
import SearchGoalList from '@/components/organisms/search/SearchGoalList.vue'
export default Vue.extend({
  middleware: 'authenticated',
  components: {
    SearchUserList,
    SearchGoalList
  },
  data() {
    return {
      isUserTabVisible: true,
      isgoalTabVisible: false
    }
  },
  methods: {
    toggleUserList() {
      this.isUserTabVisible = true
      this.isgoalTabVisible = false
    },
    toggleGoalList() {
      this.isUserTabVisible = false
      this.isgoalTabVisible = true
    }
  }
})
</script>
