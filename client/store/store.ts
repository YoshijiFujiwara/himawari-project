import Vue from 'vue'
import Vuex from 'vuex'
import { ITasksState } from './modules/task'
Vue.use(Vuex)

export interface State {
  task: ITasksState
}
export default new Vuex.Store<State>({})
