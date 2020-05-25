<template>
  <div>
    <div>
      <div>
        <form @submit="onSubmit" @reset="onReset">
          <div label="タイトル" label-for="input-1">
            <input id="input-1" v-model="form.title" type="text" required />
          </div>
          <button type="submit" variant="primary">送信</button>
          <button type="reset" variant="danger">リセット</button>
        </form>
      </div>
      <div>
        <li>
          <ul v-for="(post, i) in posts" :key="i">
            {{
              post.title
            }}
          </ul>
        </li>
      </div>
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
