<template>
  <v-main v-if="Iam">
    <!-- ユーザー情報 -->
    <v-row>
      <v-col cols="4" md="12">
        <v-img
          :src="
            Iam.avatarUrl ||
              'https://placehold.jp/2e3566/ffffff/200x200.png?text=NoImage'
          "
        />
      </v-col>
      <v-col cols="8" md="12">
        <p class="text-h5 text-center">{{ Iam.username }}</p>
        <p>
          {{ Iam.statusMessage }}
        </p>
      </v-col>
    </v-row>

    <v-btn color="white" block @click="profileEditDialog = true">
      プロフィール編集
    </v-btn>
    <v-dialog v-model="profileEditDialog" max-width="1000">
      <ProfileEditDialog :close-function="closeEditDialog" />
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
          <p class="text-subtitle-1">
            {{ commitSummary.totalTime | toJPHm }}
          </p>
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
    <v-list-item-group v-show="_isPC" v-if="groups.length" color="primary">
      <v-subheader>グループ</v-subheader>
      <v-list-item
        v-for="(group, index) in groups"
        :key="index"
        :to="`/groups/${group.id}`"
      >
        <v-list-item-avatar>
          <v-icon color="indigo">mdi-account-group</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ group.name }}（{{ group.users.length }}）
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
import { goalStore, groupStore } from '@/store'
import { CommitsSummary, GroupSerializer } from '@/openapi'
import ProfileEditDialog from '@/components/organisms/profile/ProfileEditDialog.vue'

export default Vue.extend({
  components: {
    ProfileEditDialog
  },
  data() {
    return {
      profileEditDialog: false
    }
  },
  computed: {
    commitSummary(): CommitsSummary {
      return goalStore.commitSummaryGetter
    },
    groups(): GroupSerializer[] {
      return groupStore.groupsGetter
    }
  },
  methods: {
    closeEditDialog() {
      this.profileEditDialog = false
    }
  }
})
</script>
