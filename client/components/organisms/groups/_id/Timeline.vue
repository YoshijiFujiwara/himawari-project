<template>
  <v-row justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="timeline in timelines"
          :key="timeline"
          right="true"
          class="mainText--text mb-12"
        >
          <template v-slot:icon>
            <v-avatar>
              <img src="http://i.pravatar.cc/64" />
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
              <v-btn icon class="mb-12">
                <v-icon color="satisfyIcon">mdi-emoticon-outline</v-icon>
              </v-btn>
              <v-btn icon class="mb-12">
                <v-icon>mdi-reply</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              {{ timeline.commit.description }}
            </v-card-text>
            <v-divider></v-divider>
            <v-list class="elevation-1">
              <template v-for="(i, index) in 3">
                <v-list-item :key="index" class="ml-5">
                  <v-list-item-avatar>
                    <img src="http://i.pravatar.cc/64" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-row>
                      <v-col
                        cols="12"
                        class="font-weight-bold subtitle-2 mt-0 mb-0 pt-0 pb-0"
                      >
                        ユーザ名
                      </v-col>
                      <v-col cols="12" class="mt-0 mb-0 pt-0 pb-0">
                        コメント内容
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
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

export default Vue.extend({
  computed: {
    timelines(): CommitTimelineSerializer[] {
      return groupStore.timelinesGetter
    }
  }
})
</script>
