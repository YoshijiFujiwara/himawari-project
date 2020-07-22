<template>
  <v-row v-if="group" justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <template v-for="(timeline, index) in timelines">
          <TimelineCommitCreated
            v-if="timeline.type === 'COMMIT_CREATED'"
            :key="index"
            :timeline-index="index"
            :time-labels="timeLabels"
            :timeline="timeline"
          />
          <TimelineGoalStatusUpdate
            v-if="timeline.type === 'GOAL_STATUS_UPDATED'"
            :key="index"
            :timeline-index="index"
            :time-labels="timeLabels"
            :timeline="timeline"
          />
        </template>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
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
    },
    timeLabels(): { [key: number]: string } {
      return this.timelines.reduce(
        (acc: { [key: number]: string }, timelined, index) => {
          const dateStr = format(new Date(timelined.createdAt), 'HH:mm')
          acc[index] = dateStr
          return acc
        },
        {}
      )
    }
  }
})
</script>
