<template>
  <div>
    <vs-navbar>
      <div slot="title">
        <vs-navbar-title>
          <span class="navbar-title">Project</span>
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <nuxt-link to="/users/signin"
          ><span class="navbar-login-text">ログイン</span>
        </nuxt-link>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <nuxt-link to="/users/signup"
          ><vs-button
            :color="gradiationButton.colorx"
            :gradient-color-secondary="gradiationButton.colorx2"
            type="gradient"
            gradient-direction="180deg"
            size="small"
            ><span class="navbar-signup-text">登録する</span></vs-button
          >
        </nuxt-link>
      </vs-navbar-item>
    </vs-navbar>
    <main>
      <div class="main-top">
        <vs-row class="main-image">
          <vs-row>
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="5"
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
                  :color="gradiationButton.colorx"
                  :gradient-color-secondary="gradiationButton.colorx2"
                  type="gradient"
                  gradient-direction="180deg"
                  ><span class="btn-top-start" style="font-size: 30px;"
                    >始める</span
                  ></vs-button
                >
              </div>
            </vs-col>
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="7"
            >
              <img src="~/assets/top_img_001.png" class="top-img" />
            </vs-col>
          </vs-row>
        </vs-row>
      </div>
      <div class="main-contents">
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <img src="~/assets/top_img_002.png" class="top-img" alt="" />
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <vs-row>
              <vs-col>
                <p class="top-msg-title">Project とは？</p>
              </vs-col>
              <vs-col>
                <p class="top-msg-sub">
                  Project とは、自宅学習のための自習支援サービスです。
                </p>
                <p class="top-msg-sub">
                  勉強した学習内容などの履歴を記録していくことで、
                </p>
                <p class="top-msg-sub">
                  継続する力を身につけ、効率的に勉強を行うことができます。
                </p>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
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
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <img src="~/assets/top_img_003.png" class="top-img" alt="" />
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <img src="~/assets/top_img_004.png" class="top-img" alt="" />
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
            <vs-row>
              <vs-col>
                <p class="top-msg-title">グループにシェアする</p>
              </vs-col>
              <vs-col>
                <p class="top-msg-sub">
                  グループにシェアすることで、
                </p>
                <p class="top-msg-sub">
                  お互いを高め合い、モチベーションを上げつつも、
                </p>
                <p class="top-msg-sub">
                  継続する力を身につけることができます。
                </p>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
      </div>
    </main>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store/modules/auth'

type Data = {
  gradiationButton: {
    colorx: string
    colorx2: string
  }
}
export default Vue.extend({
  middleware({ redirect }) {
    if (authStore.isLoggedIn) return redirect('/profile')
  },
  data(): Data {
    return {
      gradiationButton: {
        colorx: '#81bbf5',
        colorx2: '#1996fe'
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
main {
  display: block;
  position: relative;
  top: 0;

  width: 100%;

  button {
    width: 300px;
  }

  .main-contents {
    padding: 3rem 9rem 0;
  }

  .top-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .top-msg-title {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-family: Arial;
    font-size: 60px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.15;
    letter-spacing: normal;
    text-align: left;
    color: #75a1de;
    margin-bottom: 60px;
  }

  .top-msg-sub {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-family: Arial;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #888888;
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
    position: absolute;
    font-weight: normal;
    font-family: HiraginoSans-W3;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    color: #888888;
    top: 162px;
    left: 140px;
    .title {
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      font-family: Arial;
      font-size: 50px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.16;
      letter-spacing: normal;
      text-align: left;
      color: #75a1de;
      margin-bottom: 1em;
    }
    .subtitle-1 {
      font-size: 40px;
    }
    .subtitle-2 {
      font-size: 40px;
      margin-bottom: 200px;
    }
  }
}

.footer {
  width: 100%;
  height: 100px;
  background-color: #9db9e0;
}
</style>
