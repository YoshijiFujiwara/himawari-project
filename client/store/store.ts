import Vue from 'vue'
import Vuex from 'vuex'
import { ITasksState } from './modules/tasks'
Vue.use(Vuex)

export interface State {
  task: ITasksState
}
export default new Vuex.Store<State>({})
