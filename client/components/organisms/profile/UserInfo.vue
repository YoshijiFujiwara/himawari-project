<template>
  <v-main v-if="Iam">
    <!-- ユーザー情報 -->
    <v-row>
      <v-col cols="4" md="12">
        <v-img :src="require('@/assets/icon_sample.jpeg')" />
      </v-col>
      <v-col cols="8" md="12">
        <p class="text-h5 text-center">{{ Iam.username }}</p>
        <p>
          プロフィールの「一言」の内容が表示されます。
          プロフィールの「一言」の内容が表示されます。
          プロフィールの「一言」の内容が表示されます。
        </p>
      </v-col>
    </v-row>

    <v-btn color="white" @click="profileEditDialog = true">
      プロフィール編集
    </v-btn>
    <v-dialog v-model="profileEditDialog" max-width="1000">
      <!-- <ProfileEditDialog
        :close-dialog="
          () => {
            profileEditDialog = false
          }
        "
      /> -->
      <v-card>
        <v-card-title class="headline">
          <v-icon color="primary">account-box</v-icon>
          プロフィール編集
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="4">
                <v-img :src="require('@/assets/icon_sample.jpeg')" />
                <v-file-input
                  label="File input"
                  filled
                  hide-input
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="8">
                <v-row>
                  <v-col cols="4">
                    <p>ユーザー名</p>
                    <v-text-field label="ユーザー名" outlined required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <p>ステータスメッセージ</p>
                    <v-textarea
                      label="ステータスメッセージ"
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12">
                <v-btn large color="primary" @click="onSubmit">
                  プロフィールを保存する
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- PCのみ -->
    <v-divider v-show="_isPC" class="my-7"></v-divider>
    <div v-show="_isSP" class="my-3"></div>
    <div class="d-flex flex-row flex-md-column">
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">mdi-timer-outline</v-icon>
        <div class="d-flex flex-column">
          <p class="mb-0" :class="_isPC && 'text-h6 font-weight-bold'">
            累計学習時間
          </p>
          <p class="text-subtitle-1">{{ commitSummary.totalTime }}</p>
        </div>
      </div>
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">mdi-flag</v-icon>
        <div class="d-flex flex-column">
          <p class="mb-0" :class="_isPC && 'text-h6 font-weight-bold'">
            目標達成数
          </p>
          <p class="text-subtitle-1">99</p>
        </div>
      </div>
      <div class="d-flex">
        <v-icon x-large color="primary" class="mr-4">mdi-pencil</v-icon>
        <div class="d-flex flex-column">
          <p class="mb-0" :class="_isPC && 'text-h6 font-weight-bold'">
            累計学習数
          </p>
          <p class="text-subtitle-1">{{ commitSummary.totalCount }}</p>
        </div>
      </div>
    </div>
    <!-- PCのみ（スマホの場合は、サイドバーで見れるからかな） -->
    <v-divider v-show="_isPC" class="my-7"></v-divider>
    <!-- PCのみ（スマホの場合は、サイドバーで見れるからかな） -->
    <v-list-item-group
      v-show="_isPC"
      v-if="Iam.groups && Iam.groups.length"
      color="primary"
    >
      <v-subheader>グループ</v-subheader>
      <v-list-item v-for="(group, index) in Iam.groups" :key="index">
        <v-list-item-avatar>
          <v-icon color="indigo">mdi-account-group</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ group.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-badge color="error" content="6">
            11:24
          </v-badge>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
    <!-- スマホのみ -->
    <v-divider v-show="_isSP"></v-divider>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CommitsSummary } from '@/openapi'
// import ProfileEditDialog from '@/components/organisms/profile/ProfileEditDialog.vue'

export default Vue.extend({
  components: {
    // ProfileEditDialog
  },
  data() {
    return {
      profileEditDialog: false
    }
  },
  computed: {
    commitSummary(): CommitsSummary {
      return goalStore.commitSummaryGetter
    }
  }
})
</script>
