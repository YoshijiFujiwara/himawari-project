<template>
  <div>
    <vs-row>
      <vs-col>
        <img src="~/assets/icon_sample.jpeg" alt="" />
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
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

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
