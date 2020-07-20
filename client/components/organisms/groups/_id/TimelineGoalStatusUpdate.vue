<template>
  <v-timeline-item :right="true" class="mainText--text mb-12">
    <template v-slot:icon>
      <v-avatar>
        <v-img v-if="Iam.avatarUrl" :src="Iam.avatarUrl" />
        <svg
          v-else
          viewBox="0 0 640 640"
          v-html="jdenticonSvg(Iam.email)"
        ></svg>
      </v-avatar>
    </template>
    <template v-slot:opposite class="p-12">
      <span>mm:ss</span>
    </template>
    <h5 class="mb-5">
      {{ `ユーザーID:${timeline.goal.user.username}さんが目標を達成しました` }}
    </h5>
    <v-card class="elevation-2 pb-5">
      <v-card-title class="headline font-weight-bold"
        >{{ timeline.goal.title }}
        <span v-if="timeline.goal.label === 'CHALLENGING'" class="subtitle-1">
          のステータスをCHALLENGINGに変更しました
        </span>
        <span v-if="timeline.goal.label === 'ACHIEVEMENT'" class="subtitle-1">
          を達成しました！おめでとうございます！
        </span>
        <span v-if="timeline.goal.label === 'GIVE_UP'" class="subtitle-1">
          のステータスをGIVE_UPに変更しました
        </span>
        <v-spacer />
        <v-btn icon class="mb-12">
          <v-icon color="satisfyIcon">mdi-emoticon-outline</v-icon>
        </v-btn>
        <v-btn icon class="mb-12">
          <v-icon>mdi-reply</v-icon>
        </v-btn>
      </v-card-title>
      <v-row>
        <v-col cols="9">
          <v-card class="ml-15 mr-15">
            <v-row>
              <v-col align="center" justify="center">
                <v-col>
                  <v-icon x-large color="primary">mdi-timer-outline</v-icon>
                  <span class="headline">{{
                    timeline.goal.totalTime | toJPHm
                  }}</span>
                </v-col>
                <v-col>
                  総学習時間
                </v-col>
              </v-col>
              <div class="my-5"><v-divider vertical /></div>
              <v-col align="center" justify="center">
                <v-col>
                  <v-icon x-large color="primary">mdi-pencil</v-icon>
                  <span class="headline">{{
                    timeline.goal.commits.length
                  }}</span>
                </v-col>
                <v-col text-xs-center>
                  総学習記録時間
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TimelineSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    timeline: {
      type: Object as PropType<TimelineSerializer>,
      required: true
    }
  }
})
</script>
