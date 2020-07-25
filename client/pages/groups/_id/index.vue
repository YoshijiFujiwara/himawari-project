<template>
  <v-row justify="center" class="mt-10">
    <v-col cols="12" md="10">
      <v-card>
        <TimelineHeader />
        <GroupAssociation class="groupAssociationBg" />
        <Timelines />
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import { groupStore, goalStore } from '@/store'
import TimelineHeader from '@/components/organisms/groups/_id/TimelineHeader.vue'
import Timelines from '@/components/organisms/groups/_id/Timelines.vue'
import GroupAssociation from '@/components/organisms/groups/_id/GroupAssociation.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    Timelines,
    TimelineHeader,
    GroupAssociation
  },
  async created() {
    this._startLoading()
    const groupId = this.$route.params.id
    // グループの基本情報取得
    await groupStore.getGroup(Number(groupId))
    // タイムライン情報情報の取得
    await groupStore.getTimeline(Number(groupId))
    // 目標一覧取得
    await goalStore.getGoals()

    this._finishLoading()
  }
})
</script>
