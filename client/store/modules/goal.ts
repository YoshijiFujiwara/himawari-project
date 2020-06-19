import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  ActionAxiosResponse,
  resSuccess,
  resError
} from '@/store/utils'
import { GoalsApi, CreateGoalDto, GoalSerializer } from '~/openapi'

const goalApi = () => buildApi(GoalsApi)

@Module({
  stateFactory: true,
  name: 'modules/goal',
  namespaced: true
})
export default class Goal extends VuexModule {
  private goal: GoalSerializer | null = null

  public get goalsGetter() {
    return this.goal
  }

  @Mutation
  public SET_GOAL(goal: GoalSerializer | null) {
    this.goal = goal
  }

  @Action
  public async getGoal(id: number) {
    return await goalApi()
      .goalsControllerGetGoal(id)
      .then((res) => {
        this.SET_GOAL(res.data)
        return resSuccess(res)
      })
      .catch((e) => {
        this.SET_GOAL(null)
        return resError(e)
      })
  }

  @Action
  public async addGoal(
    createGoalDto: CreateGoalDto
  ): Promise<ActionAxiosResponse> {
    return await goalApi()
      .goalsControllerCreateGoal(createGoalDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
