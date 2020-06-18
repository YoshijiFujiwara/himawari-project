<template>
  <div class="app">
    <NavBar />
    <nuxt class="content" />
    <div class="footer">
      COPYRIGHT @ 2020 Himawarigumi, All rights Reserved
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from '@/components/organisms/layout/default/NavBar.vue'

export default Vue.extend({
  components: {
    NavBar
  }
})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh; /* 全体の高さを最低でもビューポートの100%にする */
  display: flex; /* 子クラスを横並びにする */
  flex-direction: column; /* 子クラスの横並びの方向を縦にする */
  background-color: #eff7ff;
}
.content {
  flex: 1; // flex: 1; でその要素は伸びる
  width: 90% !important;
  margin: 30px auto 30px auto !important;
}
.footer {
  height: 50px;
  text-align: center;
}
</style>
