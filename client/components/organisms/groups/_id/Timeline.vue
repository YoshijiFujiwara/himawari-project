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
              <v-btn icon class="mb-12">
                <v-icon color="satisfyIcon">mdi-emoticon-outline</v-icon>
              </v-btn>
              <v-btn icon class="mb-12">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-width="150"
                  offset-x
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-reply</v-icon>
                  </template>

                  <v-card>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-subtitle2"
                            >コメントする</v-list-item-title
                          >
                          <v-divider class="mt-3 mb-5"></v-divider>
                          <v-textarea
                            label="内容"
                            outlined
                            rows="3"
                            clearable="true"
                            auto-grow="true"
                          ></v-textarea>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-card-actions class="mt-n10">
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu = false">閉じる</v-btn>
                      <v-btn color="primary" depressed @click="menu = false"
                        >送信</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-btn>
            </v-card-title>
            <v-card-text>
              {{ timeline.commit.description }}
            </v-card-text>
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
