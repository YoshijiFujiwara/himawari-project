<template>
  <div>
    <v-list v-for="(user, index) in users" :key="index" class="elevation-1">
      <v-list-item :to="`/users/${user.id}`">
        <v-list-item-icon>
          <v-avatar color="white" size="36" class="ma-0">
            <v-img v-if="user.avatarUrl" :src="user.avatarUrl" />
            <svg
              v-else
              viewBox="0 0 640 640"
              v-html="jdenticonSvg(user.email)"
            ></svg>
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle class="mt-2">
            {{ user.statusMessage || '' }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mt-2">
            <div>
              <!-- TODO: 発表の都合上省略 -->
              <!-- <span class="mr-3">
                <v-icon color="primary">mdi-timer-outline</v-icon>
                99h99m
              </span> -->
              <span
                ><v-icon color="primary">mdi-flag</v-icon
                >{{
                  user.goals
                    ? user.goals.filter((g) => g.label === 'ACHIEVEMENT').length
                    : 0
                }}</span
              >
              <span
                ><v-icon color="primary">mdi-pencil</v-icon>
                {{
                  user.goals
                    ? user.goals.reduce((acc, cur) => {
                        return acc + cur.commits.length
                      }, 0)
                    : 0
                }}
              </span>
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
