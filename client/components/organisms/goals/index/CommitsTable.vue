<template>
  <v-card class="pa-0 mainText--text">
    <v-card-title class="commitTableHeaderBg pb-0">
      <p>yyyy年mm月dd日</p>
    </v-card-title>
    <v-expansion-panels accordion multiple>
      <v-expansion-panel v-for="(commit, i) in commits" :key="i">
        <v-expansion-panel-header>
          <div class="d-flex justify-space-between mainText--text">
            <div class="d-flex align-self-center">
              <v-icon color="primary" class="mr-3">mdi-pencil</v-icon>
              <div class="d-flex flex-column">
                <p class="font-weight-bold text-subtitle-1 ma-0">
                  {{ commit.title }}
                </p>
                <p>{{ `${commit.studyHours}時間${commit.studyMinutes}分` }}</p>
                <div>
                  <v-chip small>
                    <v-icon>mdi-emoticon-happy-outline</v-icon>
                  </v-chip>
                  <v-chip small>
                    <v-icon>mdi-emoticon-kiss-outline</v-icon>
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="d-flex align-self-center">
              <v-btn icon color="satisfyIcon">
                <v-icon>mdi-emoticon-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mainText--text">
          {{ commit.description }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { CommitSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    commits: Array as PropType<CommitSerializer[]>
  }
})
</script>
