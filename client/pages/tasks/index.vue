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
import { loadingStore } from '@/store/modules/loading'
import { taskStore } from '@/store/modules/task'
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
    }
  },
  async created() {
    await taskStore.getTasks()
  },
  methods: {
    async onSubmit() {
      loadingStore.startLoading()
      await taskStore.addTask(this.form)
      loadingStore.endLoading()
      this.resetForm()
    },
    resetForm() {
      this.form.title = ''
      this.form.description = ''
    },
    startDummyLoading() {
      loadingStore.startLoading()
      setTimeout(() => {
        loadingStore.endLoading()
      }, 3000)
    }
  }
})
</script>
