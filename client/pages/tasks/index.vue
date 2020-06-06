<template>
  <div>
    <nuxt-link to="/">トップへ</nuxt-link>
    <HelloWorld msg="hello" />
    <form>
      <vs-input v-model="form.title" placeholder="タイトル" />
      <vs-input v-model="form.description" placeholder="説明" />
      <vs-button type="gradient" @click="onSubmit">送信</vs-button>
    </form>
    <vs-alert
      v-for="(notification, i) in notifications"
      :key="i"
      color="danger"
      >{{ notification }}</vs-alert
    >
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
import { taskStore } from '@/store/modules/task'
import { notificationStore } from '@/store/modules/notification'
import HelloWorld from '@/components/HelloWorld.vue'

type Data = {
  form: {
    title: string
    description: string
  }
}
export default Vue.extend({
  components: {
    HelloWorld
  },
  data(): Data {
    return {
      form: {
        title: '',
        description: ''
      }
    }
  },
  computed: {
    tasks() {
      return taskStore.tasks
    },
    notifications() {
      return notificationStore.messages
    }
  },
  async created() {
    await taskStore.getTasks()
  },
  methods: {
    async onSubmit(e: any) {
      e.preventDefault()
      await taskStore.addTask(this.form)

      this.form.title = ''
      this.form.description = ''
    }
  }
})
</script>
