import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  ActionAxiosResponse,
  resSuccess,
  resError
} from '@/store/utils'
import { TaskSerializer, TasksApi, CreateTaskDto } from '~/openapi'

const taskApi = () => buildApi(TasksApi)

@Module({
  stateFactory: true,
  name: 'modules/task',
  namespaced: true
})
export default class Task extends VuexModule {
  private tasks: TaskSerializer[] = []

  public get tasksGetter() {
    return this.tasks
  }

  @Mutation
  public SET_TASKS(tasks: TaskSerializer[]) {
    this.tasks = tasks
  }

  @Action
  public async getTasks() {
    const res = await taskApi().tasksControllerGetTasks()
    const tasks: TaskSerializer[] = res.data
    this.SET_TASKS(tasks)
  }

  @Action
  public async addTask(
    createTaskDto: CreateTaskDto
  ): Promise<ActionAxiosResponse> {
    return await taskApi()
      .tasksControllerCreateTask(createTaskDto)
      .then((res) => {
        this.SET_TASKS([...this.tasksGetter, res.data])
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
