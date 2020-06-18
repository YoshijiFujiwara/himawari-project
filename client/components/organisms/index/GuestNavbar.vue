<template>
  <vs-navbar>
    <div slot="title">
      <vs-navbar-title>
        <span class="navbar-title">Project</span>
      </vs-navbar-title>
    </div>
    <vs-navbar-item index="0">
      <nuxt-link to="/auth/signin"
        ><span class="navbar-login-text">ログイン</span>
      </nuxt-link>
    </vs-navbar-item>
    <vs-navbar-item index="1">
      <nuxt-link to="/auth/signup"
        ><vs-button
          :color="colorx"
          :gradient-color-secondary="colorx2"
          type="gradient"
          gradient-direction="180deg"
          size="small"
          ><span class="navbar-signup-text">登録する</span></vs-button
        >
      </nuxt-link>
    </vs-navbar-item>
  </vs-navbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    colorx: {
      type: String,
      required: true
    },
    colorx2: {
      type: String,
      required: true
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
</style>
