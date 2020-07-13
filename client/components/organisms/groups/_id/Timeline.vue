<template>
  <v-row justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <StatusUpdate />
        <v-timeline-item
          v-for="timeline in timelines"
          :key="timeline"
          right="true"
          class="mainText--text mb-12"
        >
          <template v-slot:icon>
            <v-avatar>
              <img
                :src="
                  Iam.avatarUrl ||
                    'https://placehold.jp/2e3566/ffffff/200x200.png?text=NoImage'
                "
              />
            </v-avatar>
          </template>
          <template v-slot:opposite class="p-12">
            <span>mm:ss</span>
          </template>
          <h5 class="mb-5">
            {{
              `ユーザーID:${timeline.commit.goal.userId}さんが「${timeline.commit.goal.title}」に学習を記録しました`
            }}
          </h5>
          <v-card class="elevation-2">
            <v-card-title class="headline"
              >{{ timeline.commit.title }}<v-spacer />
              <span>
                <v-icon color="primary">mdi-timer-outline</v-icon>
                {{
                  `${timeline.commit.studyHours}h${timeline.commit.studyMinutes}m`
                }}
              </span>
              <div class="mb-12">
                <ReactionMenu />
              </div>
              <v-btn icon class="mb-12">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              {{ timeline.commit.description }}
            </v-card-text>
            <div class="pa-4">
              <v-chip small>
                <v-icon>mdi-emoticon-happy-outline</v-icon>
              </v-chip>
              <v-chip small>
                <v-icon>mdi-emoticon-devil-outline</v-icon>
              </v-chip>
            </div>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'
import { CommitTimelineSerializer } from '@/openapi'
import StatusUpdate from '@/components/organisms/groups/_id/StatusUpdate.vue'
import ReactionMenu from '@/components/organisms/groups/_id/ReactionMenu.vue'

export default Vue.extend({
  components: {
    StatusUpdate,
    ReactionMenu
  },
  computed: {
    timelines(): CommitTimelineSerializer[] {
      return groupStore.timelinesGetter
    }
  }
})
</script>
