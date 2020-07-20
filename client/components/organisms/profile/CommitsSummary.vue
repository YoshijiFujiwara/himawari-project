<template>
  <v-row>
    <v-col cols="11">
      <v-card color="cardGreyBg">
        <v-row no-gutters>
          <v-col
            v-for="(month, index) in months"
            :key="index"
            cols="1"
            class="pa-1"
          >
            <v-card height="200" class="d-flex flex-column">
              <v-row justify="center"
                ><v-chip color="primary" class="mt-3" label>
                  {{ Number(month.split('-')[1]) }}月
                </v-chip></v-row
              >
              <div class="d-flex justify-center mt-auto">
                <v-img
                  class="mt-auto"
                  :src="
                    require(`@/assets/${imageOfMonth(commitsByMonthly, month)}`)
                  "
                  :max-width="
                    imageOfMonth(commitsByMonthly, month) === 'himawari0.png'
                      ? 40
                      : imageOfMonth(commitsByMonthly, month) ===
                        'himawari1.png'
                      ? 70
                      : imageOfMonth(commitsByMonthly, month) ===
                        'himawari2.png'
                      ? 75
                      : imageOfMonth(commitsByMonthly, month) ===
                        'himawari3.png'
                      ? 75
                      : imageOfMonth(commitsByMonthly, month) ===
                        'himawari4.png'
                      ? 80
                      : undefined
                  "
                />
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="1">
      <v-btn class="mb-1" dark color="yearGreyBtn">2020</v-btn>
      <v-btn class="mb-1" text>2019</v-btn>
      <v-btn class="mb-1" text>2018</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { MonthlyCount } from '@/openapi'

export default Vue.extend({
  data() {
    return {
      months: [
        '2019-08',
        '2019-09',
        '2019-10',
        '2019-11',
        '2019-12',
        '2020-01',
        '2020-02',
        '2020-03',
        '2020-04',
        '2020-05',
        '2020-06',
        '2020-07'
      ]
    }
  },
  computed: {
    commitsByMonthly() {
      return goalStore.commitByMonthlyGetter
    }
  },
  methods: {
    findCountByMonth(commits: MonthlyCount[], month: string) {
      const found = commits.find((m) => m.createdAt === month)
      if (found) {
        return found.count
      }
      return 0
    },
    imageByCount(count: number) {
      if (count === 0) {
        return 'himawari0.png'
      } else if (count <= 2) {
        return 'himawari1.png'
      } else if (count <= 4) {
        return 'himawari2.png'
      } else if (count <= 6) {
        return 'himawari3.png'
      } else {
        return 'himawari4.png'
      }
    },
    imageOfMonth(commits: MonthlyCount[], month: string) {
      const count = this.findCountByMonth(commits, month)
      return this.imageByCount(count)
    }
  }
})
</script>
