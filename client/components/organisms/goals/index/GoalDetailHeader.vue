<template>
  <div>
    <h1>goalEditDialog: {{ goalEditDialog }}</h1>
    <v-row>
      <v-col cols="10">
        <p class="text-h4 font-weight-bold text-no-wrap">
          <v-icon large>{{
            !!goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline'
          }}</v-icon
          >{{ goal.title
          }}<v-chip class="ma-2" color="chipBg">
            <v-icon left color="challengingColor">mdi-fire</v-icon>
            Challenging
          </v-chip>
          <v-btn icon @click="goalEditDialog = true">
            <v-icon midium>mdi-cog</v-icon>
          </v-btn>
          <v-dialog v-model="goalEditDialog" max-width="1000">
            <v-card>
              <v-card-title>
                <span class="headline">
                  <v-icon large>{{
                    !!goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline'
                  }}</v-icon>
                  {{ goal.title }}
                </span>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  large
                  color="primary"
                  :disabled="!valid"
                  :block="_isSP"
                  @click="onSubmit"
                  >目標を保存する</v-btn
                >
              </v-card-actions>
            </v-card></v-dialog
          >
        </p>
      </v-col>
      <v-row cols="2" justify="end" align-content="center" class="pr-7">
        <p class="mr-4">
          <v-icon color="primary">mdi-timer-outline</v-icon
          >{{ totalTime | toJPHm }}
        </p>
        <p><v-icon color="primary">mdi-pencil</v-icon>{{ commits.length }}</p>
      </v-row>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    <p class="text-subtitle-1">{{ goal.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GoalSerializer, CommitSerializer } from '@/openapi'
// import GoalEditDialog from '@/components/organisms/goals/index/GoalEditDialog.vue'

export default Vue.extend({
  // components: {
  //   GoalEditDialog
  // },
  props: {
    goal: {
      type: Object as PropType<GoalSerializer>,
      required: true
    },
    commits: {
      type: Array as PropType<CommitSerializer[]>,
      required: true
    }
  },
  data() {
    return {
      goalEditDialog: false
    }
  },
  computed: {
    totalTime(): string {
      let totalTime = 0
      this.commits.forEach((c) => {
        totalTime +=
          Number(c.studyHours) * 60 * 60 + Number(c.studyMinutes) * 60
      })
      return this.secondsToHm(totalTime)
    }
  },
  methods: {
    secondsToHm(d: number): string {
      const h = Math.floor(d / 3600)
      const m = Math.floor((d % 3600) / 60)

      return `${h}:${m}`
    }
  }
})
</script>
