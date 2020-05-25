<template>
  <div>
    <div class="center grid">
      <vs-row>
        <vs-col>
          <form @submit="onSubmit">
            <vs-input
              v-model="form.title"
              placeholder="タイトル入力してエンター"
            />
          </form>
        </vs-col>

        <vs-list>
          <vs-list-item
            v-for="(post, i) in posts"
            :key="i"
            :title="post.title"
          ></vs-list-item>
        </vs-list>
      </vs-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

type DataType = {
  form: {
    title: string
  }
  posts: Array<{
    title: string
  }>
}

export default Vue.extend({
  async asyncData({ app }: Context) {
    const { data } = await app.$axios.get('/api/node/posts')
    return {
      posts: data
    }
  },
  data(): DataType {
    return {
      form: {
        title: ''
      },
      posts: []
    }
  },
  methods: {
    async onSubmit(e: any) {
      e.preventDefault()
      const res = await this.$axios.$post('/api/node/posts', {
        title: this.form.title
      })

      this.posts = [...this.posts, { title: res.title }]
      this.form.title = ''
    },
    onReset(e: any) {
      e.preventDefault()
      this.form.title = ''
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
