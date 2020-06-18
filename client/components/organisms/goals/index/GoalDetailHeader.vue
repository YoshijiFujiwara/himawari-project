<template>
  <div>
    <vs-row vs-type="flex" vs-align="flex-end">
      <vs-col vs-type="flex" vs-w="7"
        ><h1>
          <vs-icon :icon="goal.isPublic ? 'public' : 'https'" />{{
            goal.user.username || ''
          }}｜{{ goal.title }}
        </h1></vs-col
      >
      <vs-row
        vs-type="flex"
        vs-justify="space-between"
        vs-align="center"
        vs-w="5"
      >
        <vs-row vs-w="6"
          ><vs-chip color="primary">
            <vs-avatar icon="filter_vintage" />
            Challenging
          </vs-chip></vs-row
        >
        <vs-row vs-w="6" vs-type="flex" vs-justify="flex-end">
          <span class="header-timer-icon"
            ><vs-icon icon="timer" color="primary"></vs-icon
            ><span class="header-icon-text">99h99m</span></span
          >
          <span
            ><vs-icon icon="edit" color="primary"></vs-icon
            ><span class="header-icon-text">99</span></span
          >
        </vs-row>
      </vs-row>
    </vs-row>
    <vs-divider />
    <p class="goal-about">
      {{ goal.description }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { GoalSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    goal: Object as PropType<GoalSerializer>
  }
})
</script>

<style lang="scss" scoped>
.header-timer-icon {
  margin-right: 1rem;
}
.header-icon-text {
  vertical-align: super;
}
.goal-about {
  text-align: left;
  margin-bottom: 1.5rem;
}
</style>
