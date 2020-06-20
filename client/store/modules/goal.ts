import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  ActionAxiosResponse,
  resSuccess,
  resError
} from '@/store/utils'
import {
  GoalsApi,
  CommitsApi,
  CreateGoalDto,
  GoalSerializer,
  CommitSerializer,
  CreateCommitDto
} from '~/openapi'

const goalApi = () => buildApi(GoalsApi)
const commitApi = () => buildApi(CommitsApi)

@Module({
  stateFactory: true,
  name: 'modules/goal',
  namespaced: true
})
export default class Goal extends VuexModule {
  private goal: GoalSerializer | null = null
  private goals: GoalSerializer[] = []
  private commits: CommitSerializer[] = []

  public get goalGetter() {
    return this.goal
  }

  public get goalsGetter() {
    return this.goals
  }

  public get commitsGetter() {
    return this.commits
  }

  @Mutation
  public SET_GOAL(goal: GoalSerializer | null) {
    this.goal = goal
    this.commits = (goal?.commits as unknown) as CommitSerializer[]
  }

  @Mutation
  public SET_GOALS(goals: GoalSerializer[]) {
    this.goals = goals
  }

  @Mutation
  public SET_COMMITS(commits: CommitSerializer[]) {
    this.commits = commits
  }

  @Mutation
  public ADD_COMMIT(commit: CommitSerializer) {
    this.commits = [...this.commits, commit]
  }

  @Action
  public async getGoal(id: number): Promise<ActionAxiosResponse> {
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
  public async getGoals(): Promise<ActionAxiosResponse> {
    return await goalApi()
      .goalsControllerGetGoals()
      .then((res) => {
        this.SET_GOALS(res.data)
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

  @Action
  public async createCommit({
    goalId,
    createCommitDto
  }: {
    goalId: number
    createCommitDto: CreateCommitDto
  }): Promise<ActionAxiosResponse> {
    return await commitApi()
      .commitsControllerCreateCommit(goalId, createCommitDto)
      .then((res) => {
        this.ADD_COMMIT(res.data)
        return resSuccess(res)
      })
      .catch((e) => {
        return resError(e)
      })
  }
}
