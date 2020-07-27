<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        学習記録を削除する
      </v-card-title>

      <v-card-text>
        この学習記録を本当に削除しますか？削除後は元に戻すことはできません。
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">
          キャンセル
        </v-btn>

        <v-btn color="error" text @click="deleteCommit">
          削除する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { CommitSerializer } from '@/openapi'
import { goalStore } from '@/store'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    commit: {
      type: Object as PropType<CommitSerializer>,
      required: true
    }
  },
  computed: {
    dialog: {
      get(): boolean {
        return this.value
      },
      set(dialog: boolean) {
        this.$emit('input', dialog)
      }
    }
  },
  methods: {
    async deleteCommit() {
      this._startLoading()
      const { error, messages } = await goalStore.deleteCommit(this.commit.id)
      this._finishLoading()
      if (!error) {
        this._notifyyyy([
          {
            message: '学習記録を削除しました',
            type: 'success'
          }
        ])
      } else if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'error'
          }))
        )
      }
      this.dialog = false
    }
  }
})
</script>
