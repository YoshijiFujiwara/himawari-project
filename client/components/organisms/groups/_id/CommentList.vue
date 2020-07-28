<template>
  <v-list class="elevation-1">
    <template v-for="(comment, index) in comments">
      <v-list-item
        v-if="groupUsers.find((u) => u.id === comment.userId)"
        :key="index"
        class="ml-5"
      >
        <v-list-item-avatar>
          <v-avatar>
            <v-img
              v-if="groupUsers.find((u) => u.id === comment.userId).avatarUrl"
              :src="groupUsers.find((u) => u.id === comment.userId).avatarUrl"
            />
            <svg
              v-else
              viewBox="0 0 640 640"
              v-html="
                jdenticonSvg(
                  groupUsers.find((u) => u.id === comment.userId).email
                )
              "
            ></svg>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-row class="ml-1">
            <v-col
              cols="12"
              class="font-weight-bold subtitle-2 mt-0 mb-0 pt-0 pb-0"
            >
              {{ groupUsers.find((u) => u.id === comment.userId).username }}
            </v-col>
            <v-col cols="12" class="mt-0 mb-0 pt-0 pb-0">
              {{ comment.content }}
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TimelineSerializer, UserSerializer } from '@/openapi'

export default Vue.extend({
  props: {
    comments: {
      type: Array as PropType<TimelineSerializer['comments'][]>,
      required: true
    },
    groupUsers: {
      type: Array as PropType<UserSerializer[]>,
      required: true
    }
  }
})
</script>
