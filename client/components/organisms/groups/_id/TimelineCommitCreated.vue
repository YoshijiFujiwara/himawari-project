<template>
  <v-timeline-item right class="mainText--text mb-12">
    <template v-slot:icon>
      <v-avatar>
        <v-img
          v-if="timeline.commit.goal.user.avatarUrl"
          :src="timeline.commit.goal.user.avatarUrl"
        />
        <svg
          v-else
          viewBox="0 0 640 640"
          v-html="jdenticonSvg(timeline.commit.goal.user.email)"
        ></svg>
      </v-avatar>
    </template>
    <template v-slot:opposite class="p-12">
      <span>mm:ss</span>
    </template>
    <h5 class="mb-5">
      {{
        `ユーザーID:${timeline.commit.goal.user.username}さんが「${timeline.commit.goal.title}」に学習を記録しました`
      }}
    </h5>
    <v-card class="elevation-2">
      <v-card-title class="headline"
        >{{ timeline.commit.title }}<v-spacer />
        <span>
          <v-icon color="primary">mdi-timer-outline</v-icon>
          {{ `${timeline.commit.studyHours}h${timeline.commit.studyMinutes}m` }}
        </span>
        <v-btn icon class="mb-12">
          <v-menu
            v-model="reactionMenu[timeline.id]"
            :close-on-content-click="false"
            :nudge-width="150"
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" icon v-bind="attrs" v-on="on">
                <v-icon color="satisfyIcon">
                  mdi-emoticon-outline
                </v-icon>
              </v-btn>
            </template>
            <ReactionMenuCard
              :timeline-id="timeline.id"
              :close-menu="closeReactionMenu(timeline.id)"
            />
          </v-menu>
        </v-btn>
        <v-btn icon class="mb-12">
          <v-menu
            v-model="commentMenu[timeline.id]"
            :close-on-content-click="false"
            :nudge-width="150"
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-reply</v-icon>
            </template>
            <CommentMenuCard
              :timeline-id="timeline.id"
              :close-menu="closeCommentMenu(timeline.id)"
            />
          </v-menu>
        </v-btn>
      </v-card-title>
      <v-card-text>
        {{ timeline.commit.description }}
      </v-card-text>
      <div class="pa-4">
        <template v-for="emojiName in Object.keys(reactionEmojis)">
          <v-chip
            v-if="
              timeline.reactions.filter(
                (reaction) => reaction.emoji === emojiName
              ).length
            "
            :key="emojiName"
            small
            class="mx-1"
          >
            {{ reactionEmojis[emojiName] }}
            {{
              timeline.reactions.filter(
                (reaction) => reaction.emoji === emojiName
              ).length
            }}
          </v-chip>
        </template>
      </div>
      <div class="px-7"><v-divider></v-divider></div>
      <v-list class="elevation-1">
        <template v-for="(comment, index) in timeline.comments">
          <v-list-item :key="index" class="ml-5">
            <v-list-item-avatar>
              <v-avatar>
                <v-img
                  v-if="
                    group.users.find((u) => u.id === comment.userId).avatarUrl
                  "
                  :src="
                    group.users.find((u) => u.id === comment.userId).avatarUrl
                  "
                />
                <svg
                  v-else
                  viewBox="0 0 640 640"
                  v-html="
                    jdenticonSvg(
                      group.users.find((u) => u.id === comment.userId).email
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
                  {{
                    group.users.find((u) => u.id === comment.userId).username
                  }}
                </v-col>
                <v-col cols="12" class="mt-0 mb-0 pt-0 pb-0">
                  {{ comment.content }}
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TimelineSerializer, GroupSerializer } from '@/openapi'
import ReactionMenuCard from '@/components/organisms/groups/_id/ReactionMenuCard.vue'
import CommentMenuCard from '@/components/organisms/groups/_id/CommentMenuCard.vue'

export default Vue.extend({
  components: {
    ReactionMenuCard,
    CommentMenuCard
  },
  data() {
    return {
      // コメントのメニューの開閉を管理する
      // {
      //   <タイムラインのID>: そのコメントメニューが開いているかどうか
      // }
      commentMenu: {} as { [key: number]: boolean },
      // リアクションのメニューの開閉を管理する
      // 構造はcommentMenuと同じ
      reactionMenu: {} as { [key: number]: boolean },

      reactionEmojis: { GOOD: '👍', SMILE: '😄', PIEN: '🥺', POPPER: '🎉' }
    }
  },
  props: {
    timeline: {
      type: Object as PropType<TimelineSerializer>,
      required: true
    },
    group: {
      type: Object as PropType<GroupSerializer>,
      required: true
    }
  },
  methods: {
    closeCommentMenu(timelineId: number) {
      return () => {
        this.commentMenu[timelineId] = false
      }
    },
    closeReactionMenu(timelineId: number) {
      return () => {
        this.reactionMenu[timelineId] = false
      }
    }
  }
})
</script>
