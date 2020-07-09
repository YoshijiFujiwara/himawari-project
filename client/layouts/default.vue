<template>
  <v-app class="wrapper">
    <!-- ローディング -->
    <Loading />
    <!-- 通知 -->
    <Notifications />
    <!-- サイドナビゲーション(スマホ用かな) -->
    <v-navigation-drawer v-model="drawerOpen" fixed app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              class="ml-6"
              hide-details
              append-icon="mdi-magnify"
              filled
              dense
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <div v-for="(item, index) in drawerItems" :key="index">
          <v-list-item :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
        <v-list-item-group
          v-if="Iam && Iam.groups && Iam.groups.length"
          color="primary"
        >
          <v-subheader>グループ</v-subheader>
          <v-list-item v-for="(group, index) in Iam.groups" :key="index">
            <v-list-item-content>
              <v-list-item-title v-text="group.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>
        <v-list-item @click="goProfile">
          <v-list-item-action>
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ Iam ? Iam.username : '' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/auth/logout" router exact>
          <v-list-item-action>
            <v-icon>mdi-exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              ログアウト
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" fixed>
      <!-- スマホのみ -->
      <v-app-bar-nav-icon
        v-show="_isSP"
        @click="drawerOpen = !drawerOpen"
      ></v-app-bar-nav-icon>
      <v-toolbar-title><nuxt-link to="/">Project</nuxt-link></v-toolbar-title>
      <v-col cols="3">
        <!-- PCのみ -->
        <v-text-field
          v-show="_isPC"
          class="ml-6"
          hide-details
          append-icon="mdi-magnify"
          filled
          dense
          rounded
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <!-- PCのみ -->
      <v-btn v-show="_isPC" icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
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
          <!-- PCのみ -->
          <v-btn v-show="_isPC" icon v-bind="attrs" v-on="on">
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
    </v-app-bar>

    <v-dialog v-model="createCommitDialog" max-width="600px">
      <CreateCommitDialog
        :close-dialog="
          () => {
            createCommitDialog = false
          }
        "
      />
    </v-dialog>
    <v-main>
      <v-container fluid class="content-wrapper">
        <nuxt />
      </v-container>
    </v-main>
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
import { authStore } from '@/store'
import Loading from '@/components/molecules/Loading.vue'
import Notifications from '@/components/molecules/Notifications.vue'
import CreateCommitDialog from '@/components/organisms/layout/default/CreateCommitDialog.vue'

export default Vue.extend({
  components: {
    Loading,
    Notifications,
    CreateCommitDialog
  },
  data() {
    return {
      drawerOpen: false,
      createCommitDialog: false,
      drawerItems: [
        { title: '新しい目標を作成する', to: '/goals/new', icon: 'mdi-flag' },
        {
          title: 'グループを追加する',
          to: '/groups/new',
          icon: 'mdi-account-group'
        }
      ],
      addItems: [
        { title: '目標を追加', onClick: () => this.$router.push('/goals/new') },
        {
          title: 'グループを追加',
          onClick: () => this.$router.push('/groups/new')
        },
        {
          title: '学習記録を追加',
          onClick: () => this.dialogOpen()
        }
      ],
      userItems: [
        {
          title: 'ログアウト',
          onClick: () => {
            authStore.logout()
            this._notifyyyy([
              {
                message: 'ログアウトしました',
                type: 'success'
              }
            ])
          }
        }
      ]
    }
  },
  methods: {
    goProfile() {
      this.$router.push('/profile')
    },
    dialogOpen() {
      this.createCommitDialog = true
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  color: $main-text-color;
  background: $main-background-color;
}
.content-wrapper {
  padding-top: 4rem;
}
</style>
