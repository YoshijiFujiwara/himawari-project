import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import {
  UserSerializer,
  UsersApi,
  GoalSerializer,
  CommitsSummary,
  MonthlyCount
} from '~/openapi'
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
  private goalSummary: object | null = null
  private commitSummary: CommitsSummary = {
    totalTime: '00:00:00',
    totalCount: 0
  }

  private commitsByMonthly: MonthlyCount[] = []

  public get userGetter() {
    return this.user
  }

  public get goalsGetter() {
    return this.goals
  }

  public get goalSummaryGetter() {
    return this.goalSummary
  }

  public get commitSummaryGetter() {
    return this.commitSummary
  }

  public get commitByMonthlyGetter() {
    return this.commitsByMonthly
  }

  @Mutation
  public SET_USER(user: UserSerializer) {
    this.user = user
  }

  @Mutation
  public SET_GOALS(goals: GoalSerializer[]) {
    this.goals = goals
  }

  @Mutation
  public SET_GOAL_SUMMARY(goalSummary: object) {
    this.goalSummary = goalSummary
  }

  @Mutation
  public SET_COMMIT_SUMMARY(commitSummary: CommitsSummary) {
    this.commitSummary = commitSummary
  }

  @Mutation
  public SET_COMMIT_BY_MONTHLY(commitsByMonthly: MonthlyCount[]) {
    this.commitsByMonthly = commitsByMonthly
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

  @Action
  public async getGoalCommitMonthlySummary(
    userId: number
  ): Promise<ActionAxiosResponse> {
    return await userApi()
      .usersControllerGetGoalCommitMonthlySummary(userId)
      .then((res) => {
        this.SET_GOAL_SUMMARY(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getCommitSummary(userId: number): Promise<ActionAxiosResponse> {
    return await userApi()
      .usersControllerGetCommitSummaryByUser(userId)
      .then((res) => {
        this.SET_COMMIT_SUMMARY(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getCommitsByMonth(userId: number): Promise<ActionAxiosResponse> {
    return await userApi()
      .usersControllerGetMonthlyCountByUser(userId)
      .then((res) => {
        this.SET_COMMIT_BY_MONTHLY(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
