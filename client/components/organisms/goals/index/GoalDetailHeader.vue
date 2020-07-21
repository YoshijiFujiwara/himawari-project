<template>
  <div>
    <div class="d-flex justify-space-between align-center pt-5">
      <p class="text-h4 font-weight-bold text-no-wrap">
        <v-icon v-show="_isPC" large>
          {{ !!goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline' }}
        </v-icon>
        {{ _isPC ? goal.title : '' }}
        <v-chip class="ma-2" color="chipBg">
          <v-icon left color="challengingColor">mdi-fire</v-icon>
          {{ goal.label }}
        </v-chip>
        <v-btn icon @click="goalEditDialog = true">
          <v-icon midium>mdi-cog</v-icon>
        </v-btn>
        <GoalEditDialog v-model="goalEditDialog" :goal="goal" />
      </p>
      <div class="d-flex justify-end">
        <p class="mr-4">
          <v-icon color="primary">mdi-timer-outline</v-icon
          >{{ totalTime | toJPHm }}
        </p>
        <p><v-icon color="primary">mdi-pencil</v-icon>{{ commits.length }}</p>
      </div>
    </div>
    <v-divider class="mb-4"></v-divider>
    <p v-show="_isSP" class="text-h4 primary--text font-weight-bold">
      目標について
    </p>
    <p class="text-subtitle-1">{{ goal.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GoalSerializer, CommitSerializer } from '@/openapi'
import GoalEditDialog from '@/components/organisms/goals/index/GoalEditDialog.vue'

export default Vue.extend({
  components: {
    GoalEditDialog
  },
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
    },
    closeEditDialog() {
      this.goalEditDialog = false
    }
  }
})
</script>

<style></style>
