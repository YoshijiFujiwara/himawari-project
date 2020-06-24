<template>
  <vs-navbar color="#ffffff">
    <div slot="title">
      <vs-navbar-title>
        <nuxt-link to="/"
          ><span class="nav-title-text">Project</span></nuxt-link
        >
      </vs-navbar-title>
    </div>
    <vs-navbar-item index="0">
      <a href="#"
        ><vs-icon icon="notifications_none" size="medium"></vs-icon
      ></a>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <vs-dropdown :vs-trigger-click="true">
        <a href="#"><vs-icon icon="add" size="medium"></vs-icon></a>

        <vs-dropdown-menu>
          <vs-dropdown-item to="/goals/new">
            目標を追加
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar-item>
    <vs-navbar-item index="2">
      <vs-dropdown :vs-trigger-click="true">
        <a href="#"
          ><span class="username-avatar"
            >{{ Iam ? Iam.username : ''
            }}<vs-avatar
              src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/></span
        ></a>
        <vs-dropdown-menu>
          <vs-dropdown-item to="/auth/logout">
            ログアウト
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar-item>
  </vs-navbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.vs-navbar {
  height: 60px;
}
.vs-dropdown-menu {
  width: 130px;
}
.nav-title-text {
  font-size: 36px;
  color: #80a7dd;
}
.username-avatar {
  display: flex;
  align-items: center;
}
li {
  background: white;
}
</style>
