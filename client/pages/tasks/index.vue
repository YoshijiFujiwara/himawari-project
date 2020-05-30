<template>
  <div>
    <nuxt-link to="/">トップへ</nuxt-link>
    <form>
      <vs-input v-model="form.title" placeholder="タイトル" />
      <vs-input v-model="form.description" placeholder="説明" />
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
import { Configuration, TasksApi, Task, CreateTaskDto } from '../../openapi'
import { BaseAPI } from '../../openapi/base'

function buildApi<T extends BaseAPI>(Api: new (data: any) => T): T {
  const config = new Configuration({
    basePath: `${window.location.protocol}//${window.location.hostname}`
  })
  return new Api(config)
}

type Data = {
  tasks: Task[]
  form: {
    title: string
    description: string
  }
}
export default Vue.extend({
  async asyncData() {
    const { data } = await buildApi(TasksApi).tasksControllerGetTasks()
    return {
      tasks: data
    }
  },
  data(): Data {
    return {
      tasks: [],
      form: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async onSubmit(e: any) {
      e.preventDefault()
      const createTaskDto: CreateTaskDto = this.form
      const res = await buildApi(TasksApi).tasksControllerCreateTask(
        createTaskDto
      )

      const newTask = res.data
      this.tasks = [...this.tasks, newTask]

      this.form.title = ''
      this.form.description = ''
    }
  }
})
</script>
