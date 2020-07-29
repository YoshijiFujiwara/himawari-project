<template>
  <v-main>
    <div v-if="goalSummary">
      <!-- サンプル用に適当に２回数ループしとく -->
      <v-card
        v-for="month in Object.keys(goalSummary).sort(
          (a, b) => new Date(b) - new Date(a)
        )"
        :key="month"
        tile
        class="pa-0 mainText--text"
      >
        <v-card-title class="commitTableHeaderBg pb-0">
          <p>{{ month | toJPYM }}</p>
        </v-card-title>
        <v-expansion-panels accordion multiple flat>
          <template>
            <v-expansion-panel v-if="'createdGoals' in goalSummary[month]">
              <v-expansion-panel-header>
                <div class="d-flex justify-space-between mainText--text">
                  <div class="d-flex align-self-center">
                    <v-icon color="primary" class="mr-3">mdi-flag</v-icon>
                    <div class="d-flex flex-column">
                      <p class="font-weight-bold text-subtitle-1 ma-0">
                        目標を<span class="primary--text"
                          >{{ goalSummary[month].createdGoals.length }}つ</span
                        >作成しました！
                      </p>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mainText--text pl-10">
                <h4
                  v-for="goal in goalSummary[month].createdGoals"
                  :key="goal.id"
                >
                  {{ goal.title }}
                </h4>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel
              v-if="
                Object.keys(goalSummary[month]).filter(
                  (key) => key !== 'createdGoals'
                ).length
              "
            >
              <v-expansion-panel-header>
                <div class="d-flex justify-space-between mainText--text">
                  <div class="d-flex align-self-center">
                    <v-icon color="primary" class="mr-3">mdi-pencil</v-icon>
                    <div class="d-flex flex-column">
                      <p class="font-weight-bold text-subtitle-1 ma-0">
                        <span class="primary--text">
                          {{
                            Object.keys(goalSummary[month]).filter(
                              (key) => key !== 'createdGoals'
                            ).length
                          }}つ
                        </span>
                        の目標に、
                        <span class="primary--text">
                          {{
                            Object.keys(goalSummary[month])
                              .filter((key) => key !== 'createdGoals')
                              .reduce((acc, current) => {
                                return acc + goalSummary[month][current].count
                              }, 0)
                          }}回
                        </span>
                        の学習を記録しました
                      </p>
                    </div>
                  </div>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mainText--text pl-10">
                <h4
                  v-for="goalId in Object.keys(goalSummary[month]).filter(
                    (key) => key !== 'createdGoals'
                  )"
                  :key="goalId"
                >
                  {{ goalSummary[month][goalId].goalTitle }}&nbsp;
                  {{ goalSummary[month][goalId].count }}回&nbsp;&nbsp;
                  <img
                    v-for="n in goalSummary[month][goalId].count"
                    :key="n"
                    :src="require('@/assets/wateringcan.png')"
                    height="20"
                  />
                </h4>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>
        </v-expansion-panels>
      </v-card>
    </div>
    <p v-else>目標や学習記録はまだありません</p>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['goalSummary']
})
</script>
