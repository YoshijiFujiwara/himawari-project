<template>
  <vs-row vs-type="flex" vs-align="flex-end" class="row-summary-block">
    <vs-col vs-type="flex" vs-w="11">
      <vs-card class="card">
        <vs-col
          v-for="(col, index) in 12"
          :key="index"
          v-tooltip="'col - 1'"
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="1"
          class="col-summary-block"
        >
          <vs-row class="row-inside">
            <vs-col
              vs-align="center"
              vs-justify="center"
              vs-type="flex"
              class="col-month-block"
            >
              <vs-col
                vs-align="center"
                vs-justify="center"
                vs-type="flex"
                class="col-month-item-block"
              >
                1月
              </vs-col>
            </vs-col>
            <vs-col
              vs-align="flex-end"
              vs-justify="center"
              vs-type="flex"
              class="image-block"
            >
              <img v-if="index % 5 === 0" src="~/assets/himawari0.png" />
              <img v-if="index % 5 === 1" src="~/assets/himawari1.png" />
              <img v-if="index % 5 === 2" src="~/assets/himawari2.png" />
              <img v-if="index % 5 === 3" src="~/assets/himawari3.png" />
              <img v-if="index % 5 === 4" src="~/assets/himawari4.png" />
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-card>
    </vs-col>

    <vs-col vs-w="1">
      <vs-row> </vs-row>
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.row-summary-block {
  .card {
    background-color: #f5f5f5;
  }
  .col-summary-block {
    padding: 5px;
    .row-inside {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.13);
    }
  }
  .month-select-block {
    height: 100%;
    background-color: #eff7ff;
  }
  .image-block {
    height: 150px;
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.col-month-block {
  padding: 5px 15px;
  .col-month-item-block {
    color: #ffffff;
    font-family: Arial;
    background-color: #54a9fe;
    border-radius: 2px;
  }
}
</style>
