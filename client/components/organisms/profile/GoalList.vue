<template>
  <vs-col vs-type="flex" vs-w="12">
    <vs-card>
      <vs-list v-for="(goal, index) in goals" :key="index">
        <vs-row vs-type="flex" vs-justify="space-between">
          <vs-col vs-type="flex" vs-w="5" vs-offset="0">
            <vs-icon :icon="goal.isPublic ? 'public' : 'https'" />
            <p class="goal-title">
              <nuxt-link :to="`/goals/${goal.id}`">{{ goal.title }}</nuxt-link>
            </p>
            <vs-chip>
              <vs-avatar icon="fiber_manual_record" />
              challenging
            </vs-chip>
          </vs-col>
          <vs-col vs-w="2" vs-type="flex" vs-justify="flex-end">
            <span class="header-timer-icon"
              ><vs-icon icon="timer"></vs-icon
              ><span class="header-icon-text">99h99m</span></span
            >
            <span
              ><vs-icon icon="edit"></vs-icon
              ><span class="header-icon-text">{{
                goal.commits.length
              }}</span></span
            >
          </vs-col>
        </vs-row>

        <vs-divider />
      </vs-list>
    </vs-card>
  </vs-col>
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
