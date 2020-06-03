<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5.5">
      <div class="main-image">
        <img src="~/assets/signup.png" />
        <div class="contents">
          <p class="title">Project</p>
        </div>
      </div>
    </vs-col>
    <vs-col vs-type="flex" vs-w="6.5">
      <div class="right">
        <p>すでにアカウントをお持ちの方は<a href="#">こちら</a></p>
      </div>
      <!-- フォームコンポーネント読み込み予定地 -->
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.right {
  p {
    padding-left: 32vw;
    padding-top: 1vh;
    font-weight: normal;
    font-family: HiraginoSans-W3;
    color: #707070;
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
