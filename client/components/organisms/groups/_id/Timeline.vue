<template>
  <v-row v-if="group" justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <template v-for="(timeline, index) in timelines">
          <TimelineCommitCreated
            v-if="timeline.type === 'COMMIT_CREATED'"
            :key="index"
            :timeline="timeline"
            :group="group"
          />
          <TimelineGoalStatusUpdate
            v-if="timeline.type === 'GOAL_STATUS_UPDATED'"
            :key="index"
            :timeline="timeline"
            :group="group"
          />
        </template>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'
import { TimelineSerializer, GroupSerializer } from '@/openapi'
import TimelineGoalStatusUpdate from '@/components/organisms/groups/_id/TimelineGoalStatusUpdate.vue'
import TimelineCommitCreated from '@/components/organisms/groups/_id/TimelineCommitCreated.vue'

export default Vue.extend({
  components: {
    TimelineGoalStatusUpdate,
    TimelineCommitCreated
  },
  computed: {
    group(): GroupSerializer | null {
      return groupStore.groupGetter
    },
    timelines(): TimelineSerializer[] {
      return groupStore.timelinesGetter
    }
  }
})
</script>
