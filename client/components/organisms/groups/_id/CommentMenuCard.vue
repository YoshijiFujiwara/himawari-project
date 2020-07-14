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

export default Vue.extend({
  props: {
    closeMenu: {
      type: Function,
      required: true
    }
  },
  methods: {
    submit() {
      alert('コメント！')
      this.closeMenu()
    }
  }
})
</script>
