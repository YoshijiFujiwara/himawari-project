<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5.5">
      <div class="main-image">
        <img src="~/assets/signin.png" />
        <div class="contents">
          <p class="title">Project</p>
        </div>
      </div>
    </vs-col>
    <vs-col vs-type="flex" vs-w="6.5" vs-align="start">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-w="12">
          <div class="nav">
            <p>
              すでにアカウントをお持ちの方は<nuxt-link to="/users/signup"
                >こちら</nuxt-link
              >
            </p>
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-w="12">
          <SigninForm />
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import SigninForm from '@/components/SigninForm.vue'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',
  components: {
    SigninForm
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
