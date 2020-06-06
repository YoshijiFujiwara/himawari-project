import Vue from 'vue'
import Vuex from 'vuex'
import { ITasksState } from './modules/task'
import { IAuthState } from './modules/auth'
Vue.use(Vuex)

export interface State {
  task: ITasksState
  auth: IAuthState
}
export default new Vuex.Store<State>({})
