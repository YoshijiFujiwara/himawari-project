import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import store from '@/store/store'

interface ILoading {
  nowLoading: boolean
  type:
    | 'default'
    | 'point'
    | 'radius'
    | 'corners'
    | 'border'
    | 'sound'
    | 'material'
}
export interface ILoadingState {
  loading: ILoading
}

@Module({ dynamic: true, store, name: 'loading', namespaced: true })
class LoadingModule extends VuexModule implements ILoadingState {
  // state
  loading: ILoading = { nowLoading: false, type: 'default' }

  @Mutation
  public SET_NOW_LOADING(loading: ILoading) {
    this.loading = loading
  }

  @Action({})
  public startLoading(type: ILoading['type'] = 'default') {
    this.SET_NOW_LOADING({ nowLoading: true, type })
  }

  @Action({})
  public endLoading() {
    this.SET_NOW_LOADING({ nowLoading: false, type: this.loading.type })
  }
}

export const loadingStore = getModule(LoadingModule)
