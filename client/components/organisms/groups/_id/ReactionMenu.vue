<template>
  <div class="text-center">
    <v-menu top offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon color="satisfyIcon">
            mdi-emoticon-outline
          </v-icon>
        </v-btn>
      </template>
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
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
    }
  }
})
</script>

<style></style>
