<template>
  <div class="alerts">
    <v-alert
      v-for="(notification, index) in notifications"
      :key="index"
      class="mt-3 mx-10"
      :type="notification.type"
      border="bottom"
      colored-border
      transition="scale-transition"
    >
      {{ notification.message }}
      <v-icon
        slot="append"
        :color="notification.type"
        @click="deleteNotification(notification.id)"
        >mdi-delete</v-icon
      >
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    deleteNotification(id: number) {
      this._deleteNotification(id)
    }
  }
})
</script>

<style lang="scss" scoped>
.alerts {
  position: fixed;
  z-index: 100;
  width: 100vw;
}
</style>
