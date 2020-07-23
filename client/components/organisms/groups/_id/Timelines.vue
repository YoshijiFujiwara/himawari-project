<template>
  <v-row v-if="group" justify="start">
    <v-col cols="12">
      <v-timeline align-top dense>
        <template v-for="(timeline, index) in timelines">
          <div
            v-if="
              index === 0 ||
                !isSameDay(
                  new Date(timeline.createdAt),
                  new Date(timelines[index - 1].createdAt)
                )
            "
            :key="`${index}-chip`"
            class="d-flex justify-center"
          >
            <v-chip class="mx-auto">
              {{ timeline.createdAt | createdAtToDate }}
              <v-icon right>mdi-chevron-down</v-icon>
            </v-chip>
          </div>
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
import { isSameDay } from 'date-fns'
import { groupStore } from '@/store'
import { TimelineSerializer, GroupSerializer } from '@/openapi'
import TimelineGoalStatusUpdate from '@/components/organisms/groups/_id/TimelineGoalStatusUpdate.vue'
import TimelineCommitCreated from '@/components/organisms/groups/_id/TimelineCommitCreated.vue'

export default Vue.extend({
  components: {
    TimelineGoalStatusUpdate,
    TimelineCommitCreated
  },
  data() {
    return {
      isSameDay
    }
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
