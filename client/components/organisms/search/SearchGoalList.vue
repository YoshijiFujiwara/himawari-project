<template>
  <div>
    <v-list v-for="goal in goals" :key="goal" class="elevation-1">
      <v-list-item class="ml-12">
        <v-list-item-content>
          <v-list-item-title class="mainText--text">{{
            goal.user.username
          }}</v-list-item-title>
          <v-list-item-subtitle class="mt-2">
            <v-icon>mdi-earth</v-icon
            ><span class="font-weight-bold mainText--text">{{
              goal.title
            }}</span
            ><v-chip class="ma-2" color="chipBg">
              <v-icon left color="challengingColor">mdi-fire</v-icon>
              {{ goal.label }}
            </v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mainText--text ml-3">
            {{ goal.description }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-2 ml-3">
            <div>
              <span class="mr-3">
                <v-icon color="primary">mdi-timer-outline</v-icon>99h99m
              </span>
              <span><v-icon color="primary">mdi-flag</v-icon>99</span>

              <span><v-icon color="primary">mdi-pencil</v-icon>999</span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { searchStore } from '@/store'
import { GoalSerializer } from '@/openapi'
export default Vue.extend({
  computed: {
    goals(): GoalSerializer[] {
      return searchStore.goalsGetter
    }
  }
})
</script>
