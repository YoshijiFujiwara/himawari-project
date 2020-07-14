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
              <div class="mb-12">
                <ReactionMenu />
              </div>
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

                  <v-card>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-subtitle2"
                            >コメントする</v-list-item-title
                          >
                          <v-divider class="mt-3 mb-5"></v-divider>
                          <v-textarea
                            label="内容"
                            outlined
                            rows="3"
                            clearable
                            auto-grow
                          ></v-textarea>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-card-actions class="mt-n10">
                      <v-spacer></v-spacer>
                      <v-btn text @click="commentMenu[timeline.id] = false"
                        >閉じる</v-btn
                      >
                      <v-btn
                        color="primary"
                        depressed
                        @click="commentMenu[timeline.id] = false"
                        >送信</v-btn
                      >
                    </v-card-actions>
                  </v-card>
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
import ReactionMenu from '@/components/organisms/groups/_id/ReactionMenu.vue'

export default Vue.extend({
  components: {
    ReactionMenu
  },
  data() {
    return {
      // コメントのメニューの開閉を管理する
      // {
      //   <タイムラインのID>: そのコメントメニューが開いているかどうか
      // }
      commentMenu: {} as { [key: number]: boolean }
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
      return groupStore.timelinesGetter
    }
  }
})
</script>
