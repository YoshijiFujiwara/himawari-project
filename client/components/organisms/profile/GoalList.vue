<template>
  <vs-col vs-type="flex" vs-w="12">
    <vs-card>
      <vs-list v-for="(col, index) in 3" :key="index">
        <vs-row vs-type="flex" vs-justify="space-between">
          <vs-col vs-type="flex" vs-w="5" vs-offset="0">
            <vs-icon icon="public" />
            <p class="goal-title">TOEICで800点以上</p>
            <vs-chip>
              <vs-avatar icon="fiber_manual_record" />
              Challenging
            </vs-chip>
          </vs-col>
          <vs-col vs-w="2" vs-type="flex" vs-justify="flex-end">
            <span class="header-timer-icon"
              ><vs-icon icon="timer"></vs-icon
              ><span class="header-icon-text">99h99m</span></span
            >
            <span
              ><vs-icon icon="edit"></vs-icon
              ><span class="header-icon-text">99</span></span
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
export default Vue.extend({})
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
