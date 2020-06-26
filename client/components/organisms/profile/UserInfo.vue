<template>
  <div class="user-info">
    <vs-row>
      <vs-col vs-w="12">
        <img src="~/assets/icon_sample.jpeg" alt="" />
      </vs-col>
    </vs-row>
    <vs-row class="user-name">
      <vs-col vs-align="center" vs-justify="center">
        <h3>
          {{ Iam.username }}
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
        <vs-button color="#ffffff" type="filled" text-color="#000000"
          >プロフィール編集</vs-button
        >
      </vs-col>
    </vs-row>
    <vs-divider></vs-divider>
    <vs-row class="commit-summary">
      <vs-col>
        <vs-row class="commit-summary-item" vs-type="flex" vs-justify="center">
          <vs-col vs-w="5">
            <vs-icon icon="timer" size="large" color="primary"></vs-icon>
          </vs-col>
          <vs-col vs-w="5">
            <p>
              累計学習時間
            </p>
            <samp>{{ commitSummary.totalTime }}</samp>
          </vs-col>
        </vs-row>
        <vs-row class="commit-summary-item" vs-type="flex" vs-justify="center">
          <vs-col vs-w="5">
            <vs-icon icon="flag" size="large" color="primary"></vs-icon>
          </vs-col>
          <vs-col vs-w="5">
            <p>
              目標達成数
            </p>
            <samp>99</samp>
          </vs-col>
        </vs-row>
        <vs-row class="commit-summary-item" vs-type="flex" vs-justify="center">
          <vs-col vs-w="5">
            <vs-icon icon="create" size="large" color="primary"></vs-icon>
          </vs-col>
          <vs-col vs-w="5">
            <p>
              累計学習数
            </p>
            <samp>{{ commitSummary.totalCount }}</samp>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-divider></vs-divider>
    <vs-list>
      <vs-list-header title="グループ"></vs-list-header>
      <vs-list-item
        v-for="(group, index) in Iam.groups"
        :key="index"
        :title="group.name"
      >
        <vs-avatar class="group-badge" color="primary" size="small" text="2" />
      </vs-list-item>
    </vs-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CommitsSummary } from '@/openapi'

export default Vue.extend({
  computed: {
    commitSummary(): CommitsSummary {
      return goalStore.commitSummaryGetter
    }
  }
})
</script>

<style lang="scss" scoped>
.header-timer-icon {
  margin-right: 1rem;
}
.header-icon-text {
  vertical-align: super;
}

.user-info {
  padding: 0 2rem 0 2rem;

  .user-name {
    margin: 20px 0;
    h3 {
      text-align: center;
    }
  }

  .user-profile-edit {
    margin: 1rem 0 1rem 0;

    button {
      width: 100%;
    }
  }

  .commit-summary {
    padding-top: 1rem;
    .commit-summary-item {
      padding-bottom: 1rem;
    }
  }

  .group-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .group-badge {
    width: 20px;
    height: 20px;
  }

  samp {
    font-weight: bold;
    font-size: 20px;
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
