import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Task from '~/store/modules/task'
import Auth from '~/store/modules/auth'

// eslint-disable-next-line import/no-mutable-exports
let taskStore: Task
// eslint-disable-next-line import/no-mutable-exports
let authStore: Auth

function initialiseStores(store: Store<any>): void {
  taskStore = getModule(Task, store)
  authStore = getModule(Auth, store)
}

export { initialiseStores, taskStore, authStore }
