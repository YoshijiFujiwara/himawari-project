<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            リアクションを選択
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn
        v-for="(item, index) in items"
        :key="index"
        icon
        @click="onReaction(item.value)"
        >{{ item.title }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'
import { CreateReactionDto, CreateReactionDtoEmojiEnum } from '@/openapi'

export default Vue.extend({
  props: {
    closeMenu: {
      type: Function,
      required: true
    },
    timelineId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      items: [
        { title: '👍', value: CreateReactionDtoEmojiEnum.GOOD },
        { title: '😄', value: CreateReactionDtoEmojiEnum.SMILE },
        { title: '🥺', value: CreateReactionDtoEmojiEnum.PIEN },
        { title: '🎉', value: CreateReactionDtoEmojiEnum.POPPER }
      ],
      offset: true
    }
  },
  methods: {
    async onReaction(emoji: CreateReactionDtoEmojiEnum) {
      const tlId = Number(this.timelineId)
      const createReactionDto: CreateReactionDto = {
        emoji
      }

      // リアクションつけるだけなので、ローディングはあえてしない
      const { error, messages } = await groupStore.createReaction({
        timelineId: tlId,
        createReactionDto,
        userId: this.Iam.id
      })

      if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
      }
      this.closeMenu()
    }
  }
})
</script>

<style></style>
