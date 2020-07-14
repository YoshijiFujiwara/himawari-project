<template>
  <v-row justify="start">
    <v-col cols="12" md="10">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="(timeline, index) in timelines"
          :key="index"
          right
          class="mainText--text mb-12"
        >
          <template v-slot:icon>
            <v-avatar>
              <img
                :src="
                  Iam.avatarUrl ||
                    'https://placehold.jp/2e3566/ffffff/200x200.png?text=NoImage'
                "
              />
            </v-avatar>
          </template>
          <template v-slot:opposite class="p-12">
            <span>mm:ss</span>
          </template>
          <h5 class="mb-5">
            {{
              `ユーザーID:${timeline.commit.goal.userId}さんが「${timeline.commit.goal.title}」に学習を記録しました`
            }}
          </h5>
          <v-card class="elevation-2">
            <v-card-title class="headline"
              >{{ timeline.commit.title }}<v-spacer />
              <span>
                <v-icon color="primary">mdi-timer-outline</v-icon>
                {{
                  `${timeline.commit.studyHours}h${timeline.commit.studyMinutes}m`
                }}
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
                    :close-menu="closeCommentMenu(timeline.id)"
                  />
                </v-menu>
              </v-btn>
            </v-card-title>
            <v-card-text>
              {{ timeline.commit.description }}
            </v-card-text>
            <div class="pa-4">
              <v-chip small>
                <v-icon>mdi-emoticon-happy-outline</v-icon>
              </v-chip>
              <v-chip small>
                <v-icon>mdi-emoticon-devil-outline</v-icon>
              </v-chip>
            </div>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'
import { TimelineSerializer } from '@/openapi'
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
      reactionMenu: {} as { [key: number]: boolean }
    }
  },
  computed: {
    timelines(): TimelineSerializer[] {
      // コメントメニューの初期化
      if (
        Object.values(this.commentMenu).length !==
        groupStore.timelinesGetter.length
      ) {
        const menu: { [key: number]: boolean } = {}
        groupStore.timelinesGetter.forEach((t: TimelineSerializer) => {
          menu[t.id] = false
        })
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.commentMenu = menu
      }
      // リアクションメニューの初期化
      if (
        Object.values(this.reactionMenu).length !==
        groupStore.timelinesGetter.length
      ) {
        const menu: { [key: number]: boolean } = {}
        groupStore.timelinesGetter.forEach((t: TimelineSerializer) => {
          menu[t.id] = false
        })
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.reactionMenu = menu
      }
      return groupStore.timelinesGetter
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
