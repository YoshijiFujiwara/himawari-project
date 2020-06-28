<template>
  <v-content>
    <v-list class="elevation-1">
      <template v-for="(goal, index) in goals">
        <v-list-item :key="index">
          <v-list-item-avatar>
            <v-icon>{{ goal.isPublic ? 'public' : 'https' }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ goal.title
              }}<v-chip class="ma-2" color="chipBg">
                <v-icon left color="challengingColor">mdi-fire</v-icon>
                Challenging
              </v-chip>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <div>
              <span class="mr-3"><v-icon>timer</v-icon>99h99m</span>
              <span><v-icon>edit</v-icon>{{ goal.commits.length }}</span>
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="index !== goals.length - 1" :key="index"></v-divider>
      </template>
    </v-list>
  </v-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '~/store'
import { GoalSerializer } from '~/openapi'
export default Vue.extend({
  computed: {
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    }
  }
})
</script>

<style lang="scss" scoped>
.goal-title {
  margin: 0 2%;
  font-family: Arial;
  font-size: 18px;
}
.header-timer-icon {
  margin-right: 1rem;
}
.header-icon-text {
  vertical-align: super;
}
</style>
