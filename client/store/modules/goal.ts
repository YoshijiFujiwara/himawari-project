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
  CreateCommitDto,
  CommitsSummary,
  MonthlyCount,
  UpdateGoalDto
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
  private commitSummary: CommitsSummary = {
    totalTime: '00:00:00',
    totalCount: 0
  }

  private commitsByMonthly: MonthlyCount[] = []

  public get goalGetter() {
    return this.goal
  }

  public get goalsGetter() {
    return this.goals
  }

  public get commitsGetter() {
    return this.commits
  }

  public get commitSummaryGetter() {
    return this.commitSummary
  }

  public get commitByMonthlyGetter() {
    return this.commitsByMonthly
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
  public DELETE_COMMIT(commitId: number) {
    this.commits = this.commits.filter((c) => c.id !== commitId)
  }

  @Mutation
  public ADD_COMMIT(commit: CommitSerializer) {
    this.commits = [...this.commits, commit]
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
  public async updateGoal({
    id,
    updateGoalDto
  }: {
    id: number
    updateGoalDto: UpdateGoalDto
  }): Promise<ActionAxiosResponse> {
    return await goalApi()
      .goalsControllerUpdateGoal(id, updateGoalDto)
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

  @Action
  public async getMyAllCommits(): Promise<ActionAxiosResponse> {
    return await commitApi()
      .commitsControllerGetCommits()
      .then((res) => {
        this.SET_COMMITS(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getCommitSummary(): Promise<ActionAxiosResponse> {
    return await commitApi()
      .commitsControllerGetSummaryByUser()
      .then((res) => {
        this.SET_COMMIT_SUMMARY(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getCommitsByMonthly(): Promise<ActionAxiosResponse> {
    return await commitApi()
      .commitsControllerGetMonthlyCountByUser()
      .then((res) => {
        this.SET_COMMIT_BY_MONTHLY(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async deleteCommit(commitId: number): Promise<ActionAxiosResponse> {
    return await commitApi()
      .commitsControllerDeleteCommit(commitId)
      .then((res) => {
        this.DELETE_COMMIT(commitId)
        return resSuccess(res)
      })
      .catch((e) => {
        return resError(e)
      })
  }
}
