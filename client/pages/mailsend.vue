<template>
  <div>
    <div class="wrapper">
      <div class="contents">
        <vs-row>
          <vs-col
            v-tooltip="'col - 4'"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="8"
          >
            <vs-row>
              <h1 class="Project">Project</h1>
              <img src="../assets/mailsendman.png" class="mailsendman" />
              <p class="conText">
                メールアドレス受信確認用のメールを送信しました。
              </p>
              <p class="exText">
                ”メールアドレス”へ受信確認用のメールを送信しました。<br />メールをご確認していただき、メールに記載されたＵＲＬをクリックして、Projectへの登録を完了してください。
              </p>
            </vs-row>
          </vs-col>

          <vs-col
            v-tooltip="'col - 4'"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="4"
          >
            <img src="../assets/mailsend.png" class="mailsend" />
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style>
.wrapper {
  margin: 0;
  padding: 0;
  text-align: center;
}
.mailsend {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.Project {
  font-family: HiraKakuStd-W8;
  margin-left: 5%;
  position: static;
  font-size: 36px;
  text-align: left;
  color: #707070;
}
.mailsendman {
  max-width: 50%;
  margin: 0 auto;
  padding: 0 auto;
  object-fit: contain;
}
.conText {
  width: 100%;
  font-family: HiraginoSans-W7;
  font-size: 36px;
  color: #707070;
}
.exText {
  width: 100%;
  font-family: HiraginoSans-W5;
  font-size: 24px;
  color: #707070;
}
</style>
