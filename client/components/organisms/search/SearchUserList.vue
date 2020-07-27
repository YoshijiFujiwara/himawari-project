<template>
  <div>
    <v-list v-for="(user, index) in users" :key="index" class="elevation-1">
      <v-list-item :to="`/users/${user.id}`">
        <v-list-item-icon>
          <v-avatar color="indigo"> </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle class="mt-2">
            {{ user.statusMessage || '' }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-2">
            <div>
              <span class="mr-3">
                <v-icon color="primary">mdi-timer-outline</v-icon>99h99m
              </span>
              <span><v-icon color="primary">mdi-flag</v-icon>99</span>
              <span><v-icon color="primary">mdi-pencil</v-icon>999</span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { UserSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    users: {
      type: Array as PropType<UserSerializer[]>,
      required: true
    }
  }
})
</script>
