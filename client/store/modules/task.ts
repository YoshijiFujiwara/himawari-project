import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators'
import { buildApi } from '../utils'
import { notificationStore } from './notification'
import store from '@/store/store'
import { TaskSerializer, TasksApi, CreateTaskDto } from '~/openapi'

const taskApi = buildApi(TasksApi)

export interface ITasksState {
  tasks: TaskSerializer[]
}
@Module({ dynamic: true, store, name: 'task', namespaced: true })
class TaskStore extends VuexModule implements ITasksState {
  // state
  tasks: TaskSerializer[] = []

  @Mutation
  public SET_TASKS(tasks: TaskSerializer[]) {
    this.tasks = tasks
  }

  @Action({})
  public async getTasks() {
    const res = await taskApi.tasksControllerGetTasks()
    const tasks: TaskSerializer[] = res.data
    this.SET_TASKS(tasks)
  }

  @Action({})
  public async addTask(createTaskDto: CreateTaskDto) {
    notificationStore.clearMessages()
    try {
      const res = await taskApi.tasksControllerCreateTask(createTaskDto)
      const newTask = res.data
      this.SET_TASKS([...this.tasks, newTask])
    } catch (err) {
      const messages = err.response.data.message.map((m) => {
        return Object.values(m.constraints)[0]
      })
      notificationStore.addMessages(messages)
    }
  }
}

export const taskStore = getModule(TaskStore)
