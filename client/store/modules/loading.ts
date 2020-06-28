import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'

@Module({
  stateFactory: true,
  name: 'modules/loading',
  namespaced: true
})
export default class Goal extends VuexModule {
  private nowLoading: boolean = false

  public get nowLoadingGetter() {
    return this.nowLoading
  }

  @Mutation
  public SET_NOW_LOADING(nowLoading: boolean) {
    this.nowLoading = nowLoading
  }

  @Action
  public startLoading() {
    this.SET_NOW_LOADING(true)
  }

  @Action
  public finishLoading() {
    this.SET_NOW_LOADING(false)
  }
}
