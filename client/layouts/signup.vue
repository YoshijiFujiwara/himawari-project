<template>
  <div class="app">
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="5.5"
        vs-lg="5.5"
        vs-sm="5.5"
        vs-xs="0"
      >
        <div class="main-image">
          <img src="~/assets/signin.png" />
          <div class="contents">
            <p class="title">Project</p>
          </div>
        </div>
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-align="start"
        vs-w="6.5"
        vs-lg="6.5"
        vs-sm="5.5"
        vs-xs="12"
      >
        <nuxt />
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh; // 全体の高さを最低でもビューポートの100%にする
  display: flex; // 子クラスを横並びにする
  flex-direction: column; // 子クラスの横並びの方向を縦にする
}
.nav {
  p {
    padding-top: 2vh;
    padding-right: 2vw;
    font-weight: normal;
    font-family: HiraginoSans-W3;
    color: #707070;
    font-size: calc(8px + 0.5vw);
  }
}

.main-image {
  position: relative;
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
  .contents {
    position: absolute;
    font-weight: normal;
    font-family: HiraginoSans-W3;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    color: #707070;
    top: 89px;
    left: 94px;
    .title {
      font-size: 36px;
      margin-bottom: 100px;
    }
  }
}
</style>
