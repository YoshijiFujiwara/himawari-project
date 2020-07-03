<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card class="py-4">
        <TimelineHeader />
        <Timeline />
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import TimelineHeader from '@/components/organisms/groups/_id/TimelineHeader.vue'
import Timeline from '@/components/organisms/groups/_id/Timeline.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    Timeline,
    TimelineHeader
  }
})
</script>
