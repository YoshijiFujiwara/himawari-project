<template>
  <div class="user-info">
    <vs-row class="profile-icon">
      <vs-col vs-w="12">
        <img src="~/assets/icon_sample.jpeg" alt="" />
      </vs-col>
    </vs-row>
    <vs-row class="user-name">
      <vs-col vs-align="center" vs-justify="center">
        <h3>
          User Name
        </h3>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col>
        <p>
          プロフィールの「一言」の内容が表示されます。
          プロフィールの「一言」の内容が表示されます。
          プロフィールの「一言」の内容が表示されます。
        </p>
      </vs-col>
    </vs-row>
    <vs-row class="user-profile-edit">
      <vs-col vs-w="12" vs-align="center" vs-justify="center">
        <vs-button color="dark" type="border">プロフィール編集</vs-button>
      </vs-col>
    </vs-row>
    <vs-divider></vs-divider>
    <vs-row class="">
      <vs-col>
        <vs-row>
          <vs-col vs-w="6">
            <vs-icon icon="timer" size="large" color="primary"></vs-icon>
          </vs-col>
          <vs-col vs-w="6">
            <p>
              累計学習時間
            </p>
            <samp>99h99m</samp>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6">
            <vs-icon icon="flag" size="large" color="primary"></vs-icon>
          </vs-col>
          <vs-col vs-w="6">
            <p>
              目標達成数
            </p>
            <samp>99</samp>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6">
            <vs-icon icon="create" size="large" color="primary"></vs-icon>
          </vs-col>
          <vs-col vs-w="6">
            <p>
              累計学習数
            </p>
            <samp>999</samp>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-divider></vs-divider>
    <vs-row>
      <vs-col>グループ</vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="1"><vs-icon icon="account_circle"></vs-icon></vs-col>
      <vs-col vs-w="6" class="group-name">グループ名(99)</vs-col>
      <vs-col vs-w="3" class="group-day">20XX/XX/XX</vs-col>
      <vs-col vs-w="2">
        <vs-avatar size="small" text="99" />
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.header-timer-icon {
  margin-right: 1rem;
}
.header-icon-text {
  vertical-align: super;
}

.user-info {
  padding-right: 10px;

  .user-name {
    margin: 20px 0;
    h3 {
      text-align: center;
    }
  }

  .user-profile-edit {
    margin: 10px 0;

    button {
      width: 100%;
    }
  }

  samp {
    font-weight: bold;
    font-size: 28px;
  }

  .group-name {
    font-size: 16px;
  }

  .group-day {
    padding-top: 10px;
    font-size: 10px;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
