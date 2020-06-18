<template>
  <div class="main-top">
    <vs-row class="main-image">
      <vs-row>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="6"
          vs-lg="6"
          vs-sm="12"
        >
          <div class="contents">
            <p class="title">手軽に学習を記録し、シェアしよう。</p>
            <p class="subtitle-1">
              記録が億劫な人でも簡単に学習を記録。
            </p>
            <p class="subtitle-2">
              友達と簡単に応援し合えるような学習環境を提供します。
            </p>
            <vs-button
              :color="colorx"
              :gradient-color-secondary="colorx2"
              type="gradient"
              gradient-direction="180deg"
              ><span class="btn-top-start" style="font-size: 30px;"
                >始める</span
              ></vs-button
            >
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-w="6" vs-lg="6" vs-sm="12">
          <img src="~/assets/top_img_001.png" class="top-img" />
        </vs-col>
      </vs-row>
    </vs-row>
  </div>
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
.main-top {
  display: block;
  position: relative;
  width: 100%;

  button {
    width: 300px;
  }
  @media screen and (min-width: 0px) {
    .main-contents {
      text-align: center;
    }
  }
  @media screen and (min-width: 901px) {
    .main-contents {
      text-align: left;
    }
  }

  .main-image {
    background-color: rgba(182, 221, 242, 0.53);
    width: 100%;
    height: 100vh;
    padding: 0 9rem 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .contents {
      font-family: HiraginoSans-W3;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
      color: #888888;
      .title {
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        font-family: Arial;
        font-size: 30px;
        font-weight: bold;
        color: #75a1de;
        margin-bottom: 1em;
      }
      .subtitle-1 {
        font-size: 22px;
      }
      .subtitle-2 {
        font-size: 22px;
        margin-bottom: 200px;
      }
    }
  }
}
</style>
