import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { buildApi, resSuccess, resError } from '@/store/utils'
import {
  SearchesApi,
  SearchSerializer,
  UserSerializer,
  GoalSerializer
} from '~/openapi'

const searchApi = () => buildApi(SearchesApi)

@Module({
  stateFactory: true,
  name: 'modules/search',
  namespaced: true
})
export default class Search extends VuexModule {
  private searchResult: SearchSerializer | null = null
  private users: UserSerializer[] = []
  private goals: GoalSerializer[] = []

  public get searchResultGetter() {
    return this.searchResult
  }

  public get usersGetter() {
    return this.users
  }

  public get goalsGetter() {
    return this.goals
  }

  @Mutation
  public SET_SEARCH_RESULT(searchResult: SearchSerializer) {
    this.searchResult = searchResult
  }

  @Mutation
  public SET_USERS(users: UserSerializer[]) {
    this.users = users
  }

  @Mutation
  public SET_GOALS(goals: GoalSerializer[]) {
    this.goals = goals
  }

  @Action
  public async getSearchResult() {
    return await searchApi()
      .searchesControllerSearchInGroupRelatedUsers()
      .then((res) => {
        console.log(res.data)
        this.SET_SEARCH_RESULT(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getUsers() {
    return await searchApi()
      .searchesControllerGetUsers()
      .then((res) => {
        console.log(res.data)
        this.SET_USERS(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getGoals() {
    return await searchApi()
      .searchesControllerGetGoals()
      .then((res) => {
        console.log(res.data)
        this.SET_GOALS(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
