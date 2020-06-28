<template>
  <div class="alerts">
    <v-alert
      v-for="(notification, index) in notifications"
      :key="index"
      class="mt-3 mx-10"
      :type="notification.type"
      close-icon="mdi-delete"
      dismissible
      border="bottom"
      colored-border
      transition="scale-transition"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.alerts {
  position: fixed;
  z-index: 100;
  width: 100vw;
}
</style>
