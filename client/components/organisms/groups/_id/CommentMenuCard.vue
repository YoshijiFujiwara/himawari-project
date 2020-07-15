<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-subtitle2"
            >コメントする</v-list-item-title
          >
          <v-divider class="mt-3 mb-5"></v-divider>
          <v-textarea
            v-model="content"
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
      <v-btn text @click="closeMenu">閉じる</v-btn>
      <v-btn color="primary" depressed @click="submit">送信</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { CreateCommentDto } from '../../../../openapi'
import { groupStore } from '../../../../store'

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
      content: ''
    }
  },
  methods: {
    async submit() {
      const createCommentDto: CreateCommentDto = {
        content: this.content
      }
      const tlId = Number(this.timelineId)
      this._startLoading()
      const { error, messages } = await groupStore.createComment({
        timelineId: tlId,
        createCommentDto
      })
      this._finishLoading()
      if (!error) {
        alert('おk')
      } else if (error && messages) {
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
