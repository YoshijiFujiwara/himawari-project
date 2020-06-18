<template>
  <vs-col vs-type="flex" vs-justify="flex-end" vs-lg="12" vs-sm="12" vs-xs="12">
    <div class="nav">
      <p>
        既にアカウントをお持ちではない方は<nuxt-link to="/auth/signup"
          >こちら</nuxt-link
        >
      </p>
    </div>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
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
</style>
