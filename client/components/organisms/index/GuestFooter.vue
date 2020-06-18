<template>
  <footer class="footer">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        © 2020 Project. All right reserved.</vs-col
      >
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6"
        ><vs-row>
          <vs-col>利用規約</vs-col>
          <vs-col>プライバシー</vs-col>
          <vs-col>お問い合わせ</vs-col></vs-row
        ></vs-col
      >
    </vs-row>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100px;
  background-color: #9db9e0;
}
</style>
