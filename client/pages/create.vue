<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group label="タイトル" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">送信</b-button>
          <b-button type="reset" variant="danger">リセット</b-button>
        </b-form>
      </b-col>
      <b-col cols="3">
        <b-list-group>
          <b-list-group-item v-for="(post, i) in posts" :key="i">{{
            post.title
          }}</b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
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
