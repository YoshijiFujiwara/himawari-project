import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { UserSerializer, UsersApi, GoalSerializer } from '~/openapi'
import {
  ActionAxiosResponse,
  buildApi,
  resError,
  resSuccess
} from '@/store/utils'

const userApi = () => buildApi(UsersApi)

@Module({
  stateFactory: true,
  name: 'modules/user',
  namespaced: true
})
export default class User extends VuexModule {
  private user: UserSerializer | null = null
  private goals: GoalSerializer[] = []

  public get userGetter() {
    return this.user
  }

  public get goalsGetter() {
    return this.goals
  }

  @Mutation
  public SET_USER(user: UserSerializer) {
    this.user = user
  }

  @Mutation
  public SET_GOALS(goals: GoalSerializer[]) {
    this.goals = goals
  }

  @Action
  public async getUser(userId: number): Promise<ActionAxiosResponse> {
    return await userApi()
      .usersControllerGetUser(userId)
      .then((res) => {
        this.SET_USER(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getGoals(userId: number): Promise<ActionAxiosResponse> {
    return await userApi()
      .usersControllerGetGoalsOfUser(userId)
      .then((res) => {
        this.SET_GOALS(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
