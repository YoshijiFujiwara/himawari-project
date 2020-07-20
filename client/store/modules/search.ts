import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { buildApi, resSuccess, resError } from '@/store/utils'
import { SearchesApi, SearchSerializer } from '~/openapi'

const searchApi = () => buildApi(SearchesApi)

@Module({
  stateFactory: true,
  name: 'modules/search',
  namespaced: true
})
export default class Search extends VuexModule {
  private searchResult: SearchSerializer | null = null

  public get searchResultGetter() {
    return this.searchResult
  }

  @Mutation
  public SET_SEARCH_RESULT(searchResult: SearchSerializer) {
    this.searchResult = searchResult
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
}
