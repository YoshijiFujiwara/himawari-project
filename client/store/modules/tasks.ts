import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators'
import { buildApi } from '../utils'
import store from '@/store/store'
import { Task, TasksApi, CreateTaskDto } from '~/openapi'

const taskApi = buildApi(TasksApi)

export interface ITasksState {
  tasks: Task[]
}
@Module({ dynamic: true, store, name: 'task', namespaced: true })
class TaskStore extends VuexModule implements ITasksState {
  // state
  tasks: Task[] = []

  @Mutation
  public SET_TASKS(tasks: Task[]) {
    this.tasks = tasks
  }

  @Action({})
  public async getTasks() {
    const res = await taskApi.tasksControllerGetTasks()
    const tasks: Task[] = res.data
    this.SET_TASKS(tasks)
  }

  @Action({})
  public async addTask(createTaskDto: CreateTaskDto) {
    const res = await taskApi.tasksControllerCreateTask(createTaskDto)
    const newTask = res.data
    this.SET_TASKS([...this.tasks, newTask])
  }
}

export const taskStore = getModule(TaskStore)
