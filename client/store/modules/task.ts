import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  extractErrorMessages,
  ActionAxiosResponse
} from '@/store/utils'
import { TaskSerializer, TasksApi, CreateTaskDto } from '~/openapi'

const taskApi = buildApi(TasksApi)

export interface ITasksState {
  tasks: TaskSerializer[]
}
@Module({
  stateFactory: true,
  name: 'modules/task',
  namespaced: true
})
export default class Task extends VuexModule implements ITasksState {
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
  public async addTask(
    createTaskDto: CreateTaskDto
  ): Promise<ActionAxiosResponse> {
    const res = await taskApi
      .tasksControllerCreateTask(createTaskDto)
      .catch((e) => e)

    if (res.status === 201) {
      this.SET_TASKS([...this.tasks, res.data])
      return {
        res,
        error: false,
        messages: null
      }
    } else {
      const messages = extractErrorMessages(res)
      return {
        res,
        error: true,
        messages
      }
    }
  }
}
