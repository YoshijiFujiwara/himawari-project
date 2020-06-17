import { Mutation, VuexModule, Module } from 'vuex-module-decorators'
// import { buildApi } from '@/store/utils'
// import { GoalsApi } from '~/openapi'

// const goalApi = () => buildApi(GoalsApi)

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
}
