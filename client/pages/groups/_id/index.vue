<template>
  <v-row justify="center" class="mt-10">
    <v-col cols="10">
      <v-card>
        <TimelineHeader />
        <Timeline />
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'
import TimelineHeader from '@/components/organisms/groups/_id/TimelineHeader.vue'
import Timeline from '@/components/organisms/groups/_id/Timeline.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    Timeline,
    TimelineHeader
  },
  async created() {
    this._startLoading()
    const groupId = this.$route.params.id
    // タイムライン情報情報の取得
    await groupStore.getTimeline(Number(groupId))
    this._finishLoading()
  }
})
</script>
