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
      <v-btn
        v-for="year in ['2020', '2019', '2018']"
        :key="year"
        class="mb-1"
        :dark="selectedYear === year"
        :text="selectedYear !== year"
        :color="selectedYear === year ? 'yearGreyBtn' : ''"
        @click="changeYear(year)"
      >
        {{ year }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { MonthlyCount } from '@/openapi'

export default Vue.extend({
  props: {
    commitsByMonthly: {
      type: Array as PropType<MonthlyCount[]>,
      required: true
    }
  },
  data() {
    return {
      months: [] as string[],
      selectedYear: ''
    }
  },
  created() {
    const today = new Date()
    const toyear = today.getFullYear().toString()
    this.changeYear(toyear)
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
    },
    changeYear(year: string) {
      const date = new Date()
      const thisYear = date.getFullYear().toString()
      const thisMonth = date.getMonth()
      const previousYear = Number(year) - 1
      for (let i = 1; i <= 12; i++) {
        let month = 0
        if (thisYear === year) {
          month = thisMonth + i + 1
          if (month > 12) {
            month -= 12
            const ret = ('000' + month).slice(-2)
            this.months.splice(i - 1, 1, year + '-' + ret)
          } else {
            const ret = ('000' + month).slice(-2)
            this.months.splice(i - 1, 1, previousYear + '-' + ret)
          }
        } else {
          month = i
          const ret = ('000' + month).slice(-2)
          this.months.splice(i - 1, 1, year + '-' + ret)
        }
      }
      this.selectedYear = year
    }
  }
})
</script>
