<template>
  <div>
    <vs-navbar>
      <div slot="title">
        <vs-navbar-title>
          <span class="navbar-title">Project</span>
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <a href="#"><span class="navbar-login-text">ログイン</span></a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#"
          ><vs-button
            :color="gradiationButton.colorx"
            :gradient-color-secondary="gradiationButton.colorx2"
            type="gradient"
            gradient-direction="60deg"
            size="small"
            ><span class="navbar-signup-text">登録する</span></vs-button
          >
        </a>
      </vs-navbar-item>
    </vs-navbar>
    <div class="main-image">
      <img src="~/assets/top.png" />
      <div class="contents">
        <p class="title">手軽に学習を記録し、シェアしよう。</p>
        <p class="subtitle-1">記録が億劫な人でも簡単に学習を記録。</p>
        <p class="subtitle-2">
          友達と簡単に応援し合えるような学習環境を提供します。
        </p>
        <vs-button
          :color="gradiationButton.colorx"
          :gradient-color-secondary="gradiationButton.colorx2"
          type="gradient"
          gradient-direction="60deg"
          ><span style="font-size: 36px;">始める</span></vs-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      gradiationButton: {
        colorx: '#ED2870',
        colorx2: '#DB7CE7'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar-title {
  width: 153px;
  height: 40px;
  font-family: HiraKakuStd-W8;
  font-size: 36px;
  line-height: 1.69;
  text-align: left;
  color: #707070;
}
.navbar-login-text {
  width: 141px;
  height: 36px;
  font-family: HiraginoSans-W4;
  font-size: 36px;
  line-height: 1.69;
  text-align: left;
  color: #707070;
}
.navbar-signup-text {
  width: 120px;
  height: 30px;
  font-family: HiraginoSans-W3;
  font-size: 30px;
  line-height: 1.7;
  text-align: left;
  color: #ffffff;
  margin: 17px 56px 17px 56px;
}
.main-image {
  position: relative;
  img {
    width: 100%;
  }
  .contents {
    position: absolute;
    font-weight: normal;
    font-family: HiraginoSans-W3;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    color: white;
    top: 162px;
    left: 64px;
    .title {
      font-size: 58px;
      margin-bottom: 100px;
    }
    .subtitle-1 {
      font-size: 40px;
      margin-bottom: 66px;
    }
    .subtitle-2 {
      font-size: 40px;
      margin-bottom: 122px;
    }
  }
}
</style>
