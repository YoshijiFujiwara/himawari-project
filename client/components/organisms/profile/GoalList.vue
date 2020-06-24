<template>
  <vs-col vs-type="flex" vs-w="12">
    <vs-card>
      <vs-list v-for="(col, index) in 3" :key="index">
        <vs-row vs-type="flex" vs-w="12" vs-justify="space-between">
          <vs-col vs-type="flex" vs-justify="flex-end" vs-w="2" vs-offset="0">
            <vs-chip color="primary">
              <vs-avatar icon="filter_vintage" />
              Challenging
            </vs-chip>
          </vs-col>
          <vs-col vs-w="3" vs-type="flex">
            <span class="header-timer-icon"
              ><vs-icon icon="timer" color="primary"></vs-icon
              ><span class="header-icon-text">99h99m</span></span
            >
            <span
              ><vs-icon icon="edit" color="primary"></vs-icon
              ><span class="header-icon-text">99</span></span
            >
          </vs-col>
        </vs-row>
      </vs-list>
    </vs-card>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
