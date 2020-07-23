<template>
  <div>
    <!-- サンプル用に適当に２回数ループしとく -->
    <v-card v-for="n in 2" :key="n" tile class="pa-0 mainText--text">
      <v-card-title class="commitTableHeaderBg pb-0">
        <p>yyyy年mm月dd日</p>
      </v-card-title>
      <v-expansion-panels accordion multiple flat>
        <v-expansion-panel v-for="(commit, i) in commits" :key="i">
          <v-expansion-panel-header>
            <div class="d-flex justify-space-between mainText--text">
              <div class="d-flex align-self-center">
                <v-icon color="primary" class="mr-3">mdi-pencil</v-icon>
                <div class="d-flex flex-column">
                  <p class="font-weight-bold text-subtitle-1 ma-0">
                    {{ commit.title }}
                  </p>
                  <p>
                    {{ `${commit.studyHours}時間${commit.studyMinutes}分` }}
                  </p>
                </div>
              </div>
              <div class="d-flex align-self-center">
                <v-btn icon color="satisfyIcon">
                  <v-icon>mdi-sentiment_very_satisfied</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-delete_outline</v-icon>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CommitSerializer } from '@/openapi'

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    commits(): CommitSerializer[] {
      return goalStore.commitsGetter
    }
  }
})
</script>
