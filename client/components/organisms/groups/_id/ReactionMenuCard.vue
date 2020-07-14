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
        @click="onReaction()"
        >{{ item.title }}</v-btn
      >
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
  data() {
    return {
      items: [
        { title: '👍' },
        { title: '😄' },
        { title: '🥺' },
        { title: '🎉' }
      ],
      offset: true
    }
  },
  methods: {
    onReaction() {
      alert('Action!!!!')
      this.closeMenu()
    }
  }
})
</script>

<style></style>
