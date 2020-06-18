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

const dummyCommits: CommitSerializer[] = [
  {
    id: 1,
    title: '学習A',
    description: '勉強の記録が表示されます',
    studyHours: 2,
    studyMinutes: 30,
    goalId: 1,
    createdAt: 'hogehoge'
  },
  {
    id: 2,
    title: '学習B',
    description: '勉強の記録が表示されます',
    studyHours: 5,
    studyMinutes: 30,
    goalId: 1,
    createdAt: 'hogehoge'
  },
  {
    id: 3,
    title: '学習C',
    description: '勉強の記録が表示されます',
    studyHours: 1,
    studyMinutes: 30,
    goalId: 1,
    createdAt: 'hogehoge'
  }
]

@Module({
  stateFactory: true,
  name: 'modules/goal',
  namespaced: true
})
export default class Goal extends VuexModule {
  private goal: GoalSerializer | null = null
  private goals: GoalSerializer[] = []
  private commits: CommitSerializer[] = dummyCommits

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
    this.commits = [...this.commitsGetter, commit]
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
  public async createCommit(
    goalId: number,
    createCommitDto: CreateCommitDto
  ): Promise<ActionAxiosResponse> {
    return await commitApi()
      .commitsControllerCreateCommit(goalId, createCommitDto)
      .then((res) => {
        console.log(res)
        // this.ADD_COMMIT(res.data)
        return resSuccess(res)
      })
      .catch((e) => {
        console.log(e)
        return resError(e)
      })
  }
}
