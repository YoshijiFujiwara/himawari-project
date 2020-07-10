<template>
  <v-main>
    <v-list v-if="goals.length" class="elevation-1">
      <template v-for="(goal, index) in goals.slice(0, listSize)">
        <v-list-item :key="index" @click="goDetailPage(goal.id)">
          <v-list-item-avatar>
            <v-icon>{{
              goal.isPublic ? 'mdi-earth' : 'mdi-lock-outline'
            }}</v-icon>
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
              <span class="mr-3"
                ><v-icon>mdi-timer-outline</v-icon
                >{{ goal.totalTime | toJPHm }}</span
              >
              <span><v-icon>mdi-pencil</v-icon>{{ goal.commits.length }}</span>
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index !== goals.length - 1"
          :key="`${index}-divider`"
        ></v-divider>
      </template>
      <v-list-item
        v-if="goals.length > listSize"
        justify="center"
        align-content="center"
        class="text-center"
        block
        @click="addPageSize"
      >
        <v-list-item-content>
          <div class="d-flex justify-center">もっと見る</div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p v-else>
      目標はまだありません
    </p>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '~/store'
import { GoalSerializer } from '~/openapi'
export default Vue.extend({
  data() {
    return {
      listSize: 3
    }
  },
  computed: {
    goals(): GoalSerializer[] {
      return goalStore.goalsGetter
    }
  },
  methods: {
    goDetailPage(goalId: number) {
      this.$router.push(`/goals/${goalId}`)
    },
    addPageSize() {
      this.listSize += 2
    }
  }
})
</script>
