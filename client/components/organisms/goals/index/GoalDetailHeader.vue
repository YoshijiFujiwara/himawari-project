<template>
  <div>
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
        </p>
      </v-col>
      <v-row cols="2" justify="end" align-content="center" class="pr-7">
        <p class="mr-4">
          <v-icon color="primary">mdi-timer-outline</v-icon>99h99m
        </p>
        <p><v-icon color="primary">mdi-pencil</v-icon>99</p>
      </v-row>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    <p class="text-subtitle-1">{{ goal.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GoalSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    goal: {
      type: Object as PropType<GoalSerializer>,
      required: true
    }
  }
})
</script>
