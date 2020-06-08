import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators'
import { buildApi, extractErrorMessages } from '../utils'
import { notificationStore } from './notification'
import store from '@/store/store'
import { TaskSerializer, TasksApi, CreateTaskDto } from '~/openapi'

const taskApi = buildApi(TasksApi)

export interface ITasksState {
  tasks: TaskSerializer[]
}
@Module({ dynamic: true, store, name: 'task', namespaced: true })
export class TaskModule extends VuexModule implements ITasksState {
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
    notificationStore.clearNotifications()
    try {
      const res = await taskApi.tasksControllerCreateTask(createTaskDto)
      this.SET_TASKS([...this.tasks, res.data])
    } catch (err) {
      const messages = extractErrorMessages(err)
      notificationStore.addNotification({
        messages,
        color: 'warning'
      })
    }
  }
}

export const taskStore = getModule(TaskModule)
