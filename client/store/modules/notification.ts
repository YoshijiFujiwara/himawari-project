import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import store from '@/store/store'

interface INotification {
  title?: string
  messages: string[]
  time?: number
  color?: string
  icon?: string
}

export interface INotificationState {
  notifications: INotification[]
}

@Module({ dynamic: true, store, name: 'notification', namespaced: true })
class NotificationModule extends VuexModule implements INotificationState {
  // state
  notifications: INotification[] = []

  @Mutation
  public SET_NOTIFICATIONS(notifications: INotification[]) {
    this.notifications = notifications
  }

  @Action({})
  public notify(notification: INotification) {
    this.SET_NOTIFICATIONS([notification])
  }

  @Action({})
  public clearNotifications() {
    this.SET_NOTIFICATIONS([])
  }
}

export const notificationStore = getModule(NotificationModule)
