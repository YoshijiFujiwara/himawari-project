<template>
  <div>
    <v-card class="pa-0 mainText--text">
      <template
        v-for="dateStr in Object.keys(commitsByDay).sort((a, b) => a - b)"
      >
        <v-card-title :key="dateStr" class="commitTableHeaderBg pb-0">
          <p>{{ dateStr }}</p>
        </v-card-title>
        <v-expansion-panels :key="dateStr" accordion multiple>
          <v-expansion-panel
            v-for="(commit, i) in commitsByDay[dateStr]"
            :key="i"
          >
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
              {{ commit.createdAt }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-card>
    <div class="text-center">
      <v-pagination v-model="page" :length="6" circle></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { getDate, format } from 'date-fns'
import { CommitSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    commits: {
      type: Array as PropType<CommitSerializer[]>,
      required: true
    }
  },
  data() {
    return {
      dateFns: {
        getDate,
        format
      },
      page: 1
    }
  },
  computed: {
    // commits
    commitsByDay(): { [key: string]: CommitSerializer[] } {
      return this.commits.reduce(
        (acc: { [key: string]: CommitSerializer[] }, commit) => {
          const dateStr = format(new Date(commit.createdAt), 'yyyy年MM月dd日')
          if (dateStr in acc) {
            acc[dateStr].push(commit)
          } else {
            acc[dateStr] = [commit]
          }
          return acc
        },
        {}
      )
    }
  }
})
</script>
