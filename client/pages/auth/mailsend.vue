<template>
  <div>
    <div class="wrapper">
      <div class="contents">
        <vs-row>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="8"
            vs-lg="8"
            vs-sm="8"
            vs-xs="12"
          >
            <vs-row>
              <h1 class="project">Project</h1>
              <!-- <vs-row> -->
              <vs-col
                v-tooltip="'col - 8'"
                vs-offset="2"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="8"
              >
                <img src="~/assets/mailsendman.png" class="mail-sendman" />
              </vs-col>
              <!-- </vs-row> -->
              <p class="con-text">
                メールアドレス受信確認用のメールを送信しました。
              </p>
              <p class="ex-text">
                ”メールアドレス”へ受信確認用のメールを送信しました。<br />
                メールをご確認していただき、メールに記載されたＵＲＬをクリックして、<br />
                Projectへの登録を完了してください。
              </p>
            </vs-row>
          </vs-col>

          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="4"
            vs-lg="4"
            vs-sm="4"
            vs-xs="0"
          >
            <div><img src="~/assets/signup.png" class="mail-send" /></div>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest'
})
</script>
<style>
.wrapper {
  margin: 0;
  padding: 0;
  text-align: center;
}
.mail-send {
  max-width: 100%;
  height: 100vh;
  object-fit: cover;
}
.project {
  font-family: HiraKakuStd-W8;
  margin-left: 5%;
  font-size: 36px;
  text-align: left;
}
.mail-sendman {
  margin: 10%;
  margin-bottom: 5%;
  padding: 0 auto;
  object-fit: contain;
}
.con-text {
  width: 100%;
  font-family: HiraginoSans-W7;
  margin: 0 2%;
  font-size: calc(20px + 1vw);
}
.ex-text {
  width: 100%;
  font-family: HiraginoSans-W5;
  margin: 2%;
  margin-top: calc(20px + 3vw);
  font-size: calc(9px + 1vw);
}
</style>
