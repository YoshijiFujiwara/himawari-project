<template>
  <vs-row>
    <vs-col
      vs-type="flex"
      vs-justify="flex-end"
      vs-lg="12"
      vs-sm="12"
      vs-xs="12"
    >
      <div class="nav">
        <p>
          すでにアカウントをお持ちの方は<nuxt-link to="/auth/signin"
            >こちら</nuxt-link
          >
        </p>
      </div>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-lg="12" vs-sm="12" vs-xs="12">
      <SignupForm />
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SignupForm from '@/components/container/auth/signup/SignupForm.vue'

export default Vue.extend({
  layout: 'signup',
  middleware: 'guest',
  components: {
    SignupForm
  }
})
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
