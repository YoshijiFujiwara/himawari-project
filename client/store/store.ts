import Vue from 'vue'
import Vuex from 'vuex'
import { ITasksState } from './modules/task'
import { IAuthState } from './modules/auth'
import { ILoadingState } from './modules/loading'
import { INotificationState } from './modules/notification'
Vue.use(Vuex)

export interface State {
  task: ITasksState
  auth: IAuthState
  loading: ILoadingState
  notification: INotificationState
}
export default new Vuex.Store<State>({})
