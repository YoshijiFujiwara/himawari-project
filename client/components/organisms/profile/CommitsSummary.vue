<template>
  <vs-row vs-type="flex" vs-align="center" class="row-summary-block">
    <vs-col
      vs-type="flex"
      vs-justify="center"
      vs-align="center"
      vs-w="11"
      class="col-summary-container"
    >
      <vs-card class="card">
        <vs-col
          v-for="(col, index) in months"
          :key="index"
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
                {{ Number(col.split('-')[1]) }}月
              </vs-col>
            </vs-col>
            <vs-col
              vs-align="flex-end"
              vs-justify="center"
              vs-type="flex"
              class="image-block"
            >
              <img
                v-if="index % 5 === 0"
                src="~/assets/himawari0.png"
                class="seed"
              />
              <img v-if="index % 5 === 1" src="~/assets/himawari1.png" />
              <img v-if="index % 5 === 2" src="~/assets/himawari2.png" />
              <img v-if="index % 5 === 3" src="~/assets/himawari3.png" />
              <img v-if="index % 5 === 4" src="~/assets/himawari4.png" />
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-card>
    </vs-col>

    <vs-col
      vs-type="flex"
      vs-justify="start"
      vs-align="center"
      vs-w="1"
      class="month-container"
    >
      <div>
        <vs-button color="#979797" type="flat" class="btn-year">2020</vs-button>
        <vs-button color="#979797" type="flat" class="btn-year">2019</vs-button>
        <vs-button color="#979797" type="flat" class="btn-year">2018</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'

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
  }
})
</script>

<style lang="scss" scoped>
.row-summary-block {
  .col-summary-container {
    justify-content: space-evenly;
  }
  .card {
    background-color: #f5f5f5;
    justify-content: space-evenly;
    flex-direction: row;
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
    .seed {
      max-width: 40px;
      max-height: 45px;
    }
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .month-container {
    display: flex;
    height: 100%;
    min-height: 210px;
    flex-direction: column;
    justify-content: center;
    .btn-year {
      width: 80px;
      height: 30px;
      padding: 5px;
      margin: 2px 5px 2px 5px;
      font-weight: bold;
      color: #606060;
      font-family: Arial;
    }
  }
}
.col-month-block {
  padding: 5px 20px;
  .col-month-item-block {
    color: #ffffff;
    font-family: Arial;
    background-color: #54a9fe;
    border-radius: 2px;
  }
}
</style>
