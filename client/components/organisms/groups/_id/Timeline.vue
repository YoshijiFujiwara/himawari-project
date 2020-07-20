<template>
  <v-row v-if="group" justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <template v-for="(timeline, index) in timelines">
          <TimelineCommitCreated
            v-if="timeline.type === 'COMMIT_CREATED'"
            :key="index"
            :timeline="timeline"
          />
          <TimelineGoalStatusUpdate
            v-if="timeline.type === 'GOAL_STATUS_UPDATED'"
            :key="index"
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
  data() {
    return {
      // コメントのメニューの開閉を管理する
      // {
      //   <タイムラインのID>: そのコメントメニューが開いているかどうか
      // }
      commentMenu: {} as { [key: number]: boolean },
      // リアクションのメニューの開閉を管理する
      // 構造はcommentMenuと同じ
      reactionMenu: {} as { [key: number]: boolean },

      reactionEmojis: { GOOD: '👍', SMILE: '😄', PIEN: '🥺', POPPER: '🎉' }
    }
  },
  computed: {
    group(): GroupSerializer | null {
      return groupStore.groupGetter
    },
    timelines(): TimelineSerializer[] {
      return groupStore.timelinesGetter
    }
  },
  methods: {
    closeCommentMenu(timelineId: number) {
      return () => {
        this.commentMenu[timelineId] = false
      }
    },
    closeReactionMenu(timelineId: number) {
      return () => {
        this.reactionMenu[timelineId] = false
      }
    }
  }
})
</script>
