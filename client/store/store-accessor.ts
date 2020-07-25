import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Task from '~/store/modules/task'
import Auth from '~/store/modules/auth'
import Goal from '~/store/modules/goal'
import Group from '~/store/modules/group'
import Loading from '~/store/modules/loading'
import Notification from '~/store/modules/notification'
import Search from '~/store/modules/search'
import User from '~/store/modules/user'

// eslint-disable-next-line import/no-mutable-exports
let taskStore: Task
// eslint-disable-next-line import/no-mutable-exports
let authStore: Auth
// eslint-disable-next-line import/no-mutable-exports
let goalStore: Goal
// eslint-disable-next-line import/no-mutable-exports
let groupStore: Group
// eslint-disable-next-line import/no-mutable-exports
let loadingStore: Loading
// eslint-disable-next-line import/no-mutable-exports
let notificationStore: Notification
// eslint-disable-next-line import/no-mutable-exports
let searchStore: Search
// eslint-disable-next-line import/no-mutable-exports
let userStore: User

function initialiseStores(store: Store<any>): void {
  taskStore = getModule(Task, store)
  authStore = getModule(Auth, store)
  goalStore = getModule(Goal, store)
  groupStore = getModule(Group, store)
  loadingStore = getModule(Loading, store)
  notificationStore = getModule(Notification, store)
  searchStore = getModule(Search, store)
  userStore = getModule(User, store)
}

export {
  initialiseStores,
  taskStore,
  authStore,
  goalStore,
  groupStore,
  loadingStore,
  notificationStore,
  searchStore,
  userStore
}
