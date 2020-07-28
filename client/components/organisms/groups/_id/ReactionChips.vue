<template>
  <div class="pa-4">
    <template v-for="(emoji, index) in reactionEmojis">
      <v-chip
        v-if="
          timeline.reactions.filter(
            (reaction) => reaction.emoji === emoji.value
          ).length
        "
        :key="index"
        small
        :color="
          timeline.reactions.filter((reaction) => {
            return reaction.emoji === emoji.value && reaction.userId === Iam.id
          }).length
            ? 'primary'
            : 'chipGreyBg'
        "
        :outlined="
          timeline.reactions.filter((reaction) => {
            return reaction.emoji === emoji.value && reaction.userId === Iam.id
          }).length > 0
        "
        class="mx-1"
        @click="onReaction(emoji.value)"
      >
        {{ emoji.title }}
        {{
          timeline.reactions.filter(
            (reaction) => reaction.emoji === emoji.value
          ).length
        }}
      </v-chip>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import {
  TimelineSerializer,
  CreateReactionDto,
  CreateReactionDtoEmojiEnum
} from '@/openapi'
import { groupStore } from '@/store'

export default Vue.extend({
  props: {
    timeline: {
      type: Object as PropType<TimelineSerializer>,
      required: true
    }
  },
  data() {
    return {
      reactionEmojis: [
        { title: '👍', value: CreateReactionDtoEmojiEnum.GOOD },
        { title: '😄', value: CreateReactionDtoEmojiEnum.SMILE },
        { title: '🥺', value: CreateReactionDtoEmojiEnum.PIEN },
        { title: '🎉', value: CreateReactionDtoEmojiEnum.POPPER }
      ]
    }
  },
  methods: {
    async onReaction(emoji: CreateReactionDtoEmojiEnum) {
      const tlId = Number(this.timeline.id)
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
    }
  }
})
</script>
