<template>
  <div>
    <nuxt-link to="/">トップへ</nuxt-link>
    <vs-button color="success" type="border" @click="startDummyLoading"
      >3秒間のローディングのテストボタン</vs-button
    >
    <HelloWorld msg="hello" />
    <form>
      <vs-input v-model="form.title" placeholder="タイトル" />
      <vs-input v-model="form.description" placeholder="説明" />
      <vs-button type="gradient" @click="onSubmit">送信</vs-button>
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
import { taskStore } from '@/store'
import HelloWorld from '@/components/atoms/HelloWorld.vue'

type Data = {
  form: {
    title: string
    description: string
  }
}
export default Vue.extend({
  middleware: 'authenticated',
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
      return taskStore.tasksGetter
    }
  },
  async created() {
    this.$vs.loading()
    await taskStore.getTasks()
    this.$vs.loading.close()
  },
  methods: {
    async onSubmit() {
      this.$vs.loading()
      const { error, messages } = await taskStore.addTask(this.form)
      this.$vs.loading.close()

      if (error && messages) this.notify({ messages, color: 'warning' })
      if (!error) this.resetForm()
    },
    resetForm() {
      this.form.title = ''
      this.form.description = ''
    },
    startDummyLoading() {
      this.$vs.loading()
      setTimeout(() => {
        this.$vs.loading.close()
      }, 3000)
    }
  }
})
</script>
