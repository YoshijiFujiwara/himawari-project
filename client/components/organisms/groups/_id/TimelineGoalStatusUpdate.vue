<template>
  <v-timeline-item
    :right="true"
    class="mainText--text mb-12 pr-7"
    color="white lighten-2"
  >
    <template v-slot:icon>
      <v-avatar>
        <v-img
          v-if="timeline.goal.user.avatarUrl"
          :src="timeline.goal.user.avatarUrl"
        />
        <svg
          v-else
          viewBox="0 0 640 640"
          v-html="jdenticonSvg(timeline.goal.user.email)"
        ></svg>
      </v-avatar>
    </template>
    <template v-slot:opposite class="p-12">
      <span>mm:ss</span>
    </template>
    <h5 class="mb-5">
      <v-row>
        <v-col cols="11">
          {{
            timeline.toLabel === 'ACHIEVEMENT'
              ? `ユーザーID:${timeline.goal.user.username}さんが目標を達成しました`
              : `ユーザーID:${timeline.goal.user.username}さんがステータスを変更しました`
          }}
        </v-col>
        <v-col cols="1">
          <span>{{ timeline.createdAt | createdAtToHHmm }}</span>
        </v-col>
      </v-row>
    </h5>
    <v-card class="elevation-2">
      <v-card-title class="headline font-weight-bold"
        >{{ timeline.goal.title }}
        <span class="subtitle-1">
          {{
            timeline.toLabel === 'CHALLENGING'
              ? 'のステータスをCHALLENGINGに変更しました'
              : timeline.toLabel === 'ACHIEVEMENT'
              ? 'を達成しました！おめでとうございます！'
              : timeline.toLabel === 'GIVE_UP'
              ? 'のステータスをGIVE_UPに変更しました'
              : ''
          }}
        </span>
        <v-spacer />
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
      <v-row>
        <v-col cols="12" md="9">
          <v-card class="ml-15 mr-15">
            <v-row>
              <v-col align="center" justify="center">
                <v-col>
                  <v-icon x-large color="primary">mdi-timer-outline</v-icon>
                  <span class="headline">{{
                    timeline.goal.totalTime | toJPHm
                  }}</span>
                </v-col>
                <v-col>
                  総学習時間
                </v-col>
              </v-col>
              <div class="my-5"><v-divider vertical /></div>
              <v-col align="center" justify="center">
                <v-col>
                  <v-icon x-large color="primary">mdi-pencil</v-icon>
                  <span class="headline">{{
                    timeline.goal.commits.length
                  }}</span>
                </v-col>
                <v-col text-xs-center>
                  総学習記録時間
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <ReactionChips :timeline="timeline" />
      <div v-if="timeline.comments.length" class="px-7">
        <v-divider></v-divider>
      </div>
      <CommentList
        v-if="timeline.comments.length && group.users"
        :comments="timeline.comments"
        :group-users="group.users"
      />
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TimelineSerializer, GroupSerializer } from '@/openapi'
import ReactionChips from '@/components/organisms/groups/_id/ReactionChips.vue'
import ReactionMenuCard from '@/components/organisms/groups/_id/ReactionMenuCard.vue'
import CommentMenuCard from '@/components/organisms/groups/_id/CommentMenuCard.vue'
import CommentList from '@/components/organisms/groups/_id/CommentList.vue'

export default Vue.extend({
  components: {
    ReactionMenuCard,
    CommentMenuCard,
    ReactionChips,
    CommentList
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
