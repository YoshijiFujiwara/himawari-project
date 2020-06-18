<template>
  <vs-row>
    <vs-col
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="6"
      vs-lg="6"
      vs-sm="12"
    >
      <vs-row>
        <vs-col>
          <p class="top-msg-title">目標を設定する</p>
        </vs-col>
        <vs-col>
          <p class="top-msg-sub">
            目標を設定することで、勉強のゴール地点を明確にし、
          </p>
          <p class="top-msg-sub">
            履歴や振り返りを行うことで、ゴールに向けて
          </p>
          <p class="top-msg-sub">
            何をすればいいのかが明確になります。
          </p>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-col
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="6"
      vs-lg="6"
      vs-sm="12"
    >
      <img src="~/assets/top_img_003.png" class="top-img" alt="" />
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.top-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.top-msg-title {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-family: Arial;
  font-size: 60px;
  font-size: calc(2.4rem + ((1vw - 0.33rem) * 2.1429));
  color: #75a1de;
  margin-bottom: 60px;
}

.top-msg-sub {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-family: Arial;
  font-size: 24px;
  font-size: calc(1.4rem + ((1vw - 0.64rem) * 0.7143));
  color: #888888;
}
</style>
