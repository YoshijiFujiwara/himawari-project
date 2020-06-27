<template>
  <v-app class="wrapper">
    <v-toolbar color="white">
      <v-app-bar-nav-icon
        class="d-flex d-sm-none d-md-none"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Project</v-toolbar-title>
      <v-col cols="3">
        <!-- スマホ・タブレットの時は非表示 -->
        <v-text-field
          class="ml-6 d-none d-sm-flex d-sm-none d-md-flex"
          hide-details
          append-icon="search"
          filled
          dense
          rounded
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications_none</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>add</v-icon>
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in addItems" :key="index">
            <v-list-item-title
              ><v-btn text @click="item.onClick">{{
                item.title
              }}</v-btn></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in userItems" :key="index">
            <v-list-item-title
              ><v-btn text @click="item.onClick">
                {{ item.title }}</v-btn
              ></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid class="pa-0">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="transparent">
      <v-row justify="center" class="px-4">
        <v-col cols="12" sm="9" class="ml-4 text-center text-md-left">
          COPYRIGHT @ 2020 Himawarigumi, All rights Reserved
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      addItems: [
        { title: '目標を追加', onClick: () => this.$router.push('/goals/new') },
        {
          title: 'グループを追加',
          onClick: () => this.$router.push('/groups/new')
        }
      ],
      userItems: [
        {
          title: 'ログアウト',
          onClick: () => this.$router.push('/auth/logout')
        }
      ]
    }
  },
  methods: {
    goSigninPage() {
      this.$router.push('/auth/signin')
    },
    goSignupPage() {
      this.$router.push('/auth/signup')
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  color: #707070; // アプリケーション全体を通した文字のメインカラー
}
</style>
