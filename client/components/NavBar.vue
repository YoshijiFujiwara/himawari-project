<template>
  <div>
    <vs-navbar color="#FFFFFF">
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
        <a href="#"><vs-icon icon="add" size="medium"></vs-icon></a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#"
          ><span class="username-avatar"
            >{{ Iam ? Iam.username : ''
            }}<vs-avatar
              src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/></span
        ></a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.vs-navbar {
  height: 60px;
}
.nav-title-text {
  font-size: 36px;
  color: #80a7dd;
}
.username-avatar {
  display: flex;
  align-items: center;
}
</style>
