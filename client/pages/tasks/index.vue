<template>
  <div>
    <nuxt-link to="/">トップへ</nuxt-link>
    <form>
      <vs-input placeholder="タイトル" v-model="form.title" />
      <vs-input placeholder="説明" v-model="form.description" />
      <vs-button
        v-if="form.title && form.description"
        type="gradient"
        @click="onSubmit"
        >送信</vs-button
      >
    </form>
    <vs-list>
      <vs-list-item
        v-for="task in tasks"
        :key="task.id"
        :title="task.title"
        :subtitle="task.description"
      ></vs-list-item>
    </vs-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

type Data = {
  tasks: {
    id: number
    title: string
    description: string
    status: string
  }[]
  form: {
    title: string
    description: string
  }
}
export default Vue.extend({
  data(): Data {
    return {
      tasks: [],
      form: {
        title: '',
        description: ''
      }
    }
  },
  async asyncData({ app }: Context) {
    const { data } = await app.$axios.get('/api/tasks')
    return {
      tasks: data
    }
  },
  methods: {
    async onSubmit(e: any) {
      e.preventDefault()
      const res = await this.$axios.$post('/api/tasks', this.form)
      this.tasks = [...this.tasks, res]

      this.form.title = ''
      this.form.description = ''
    }
  }
})
</script>
