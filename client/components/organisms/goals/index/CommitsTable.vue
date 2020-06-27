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
              <v-icon color="primary" class="mr-3">edit</v-icon>
              <div class="d-flex flex-column">
                <p class="font-weight-bold text-subtitle-1 ma-0">
                  {{ commit.title }}
                </p>
                <p>00h00m</p>
                <div>
                  <v-chip small>
                    <v-icon>sentiment_satisfied_alt</v-icon>
                  </v-chip>
                  <v-chip small>
                    <v-icon>sentiment_very_dissatisfied</v-icon>
                  </v-chip>
                  <v-chip small>
                    <v-icon>child_care</v-icon>
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="d-flex align-self-center">
              <v-btn icon color="satisfyIcon">
                <v-icon>sentiment_very_satisfied</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>delete_outline</v-icon>
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
