import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  ActionAxiosResponse,
  resSuccess,
  resError
} from '@/store/utils'
import { GoalsApi, CreateGoalDto } from '~/openapi'

const goalApi = () => buildApi(GoalsApi)

@Module({
  stateFactory: true,
  name: 'modules/goal',
  namespaced: true
})
export default class Goal extends VuexModule {
  private goal: any = {}

  public get goalsGetter() {
    return this.goal
  }

  @Mutation
  public SET_GOAL(goal: any) {
    this.goal = goal
  }

  @Action
  public async addGoal(
    createGoalDto: CreateGoalDto
  ): Promise<ActionAxiosResponse> {
    return await goalApi()
      .goalsControllerCreateGoal(createGoalDto)
      .then((res) => {
        this.SET_GOAL([...this.goalsGetter, res.data])
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
