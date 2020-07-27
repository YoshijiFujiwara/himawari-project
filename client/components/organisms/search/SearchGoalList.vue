<template>
  <div>
    <v-list v-for="(goal, index) in goals" :key="index" class="elevation-1">
      <v-list-item class="ml-12" :to="`/goals/${goal.id}`">
        <v-list-item-content>
          <v-list-item-title class="mainText--text">{{
            goal.user.username
          }}</v-list-item-title>
          <v-list-item-subtitle>
            <v-icon>mdi-earth</v-icon
            ><span class="font-weight-bold mainText--text">{{
              goal.title
            }}</span
            ><v-chip class="ma-2" color="chipBg">
              <v-icon small left :color="_getLabelColor(goal.label)"
                >mdi-circle</v-icon
              >
              {{ goal.label }}
            </v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mainText--text ml-3">
            {{ goal.description || '' }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-2 ml-3">
            <div>
              <span class="mr-3">
                <v-icon color="primary">mdi-timer-outline</v-icon
                >{{ goal.totalTime | toJPHm }}
              </span>
              <span
                ><v-icon color="primary">mdi-pencil</v-icon
                >{{ goal.commits.length }}</span
              >
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GoalSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    goals: {
      type: Array as PropType<GoalSerializer[]>,
      required: true
    }
  }
})
</script>
