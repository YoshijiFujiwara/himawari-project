<template>
  <v-main>
    <v-slide-group
      v-model="model"
      class="py-4"
      :multiple="multiple"
      :mandatory="mandatory"
      :show-arrows="showArrows"
      :center-active="centerActive"
    >
      <v-slide-item
        v-for="(month, index) in months"
        :key="index"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          color="white"
          class="my-4 mx-1 d-flex flex-column"
          height="200"
          width="80"
          @click="toggle"
        >
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
                  : imageOfMonth(commitsByMonthly, month) === 'himawari1.png'
                  ? 70
                  : imageOfMonth(commitsByMonthly, month) === 'himawari2.png'
                  ? 75
                  : imageOfMonth(commitsByMonthly, month) === 'himawari3.png'
                  ? 75
                  : imageOfMonth(commitsByMonthly, month) === 'himawari4.png'
                  ? 80
                  : undefined
              "
            />
          </div>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-main>
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
      ],
      model: null,
      multiple: false,
      mandatory: false,
      showArrows: true,
      centerActive: true
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
