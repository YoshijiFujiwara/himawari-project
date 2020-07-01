import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'

export type NotificationItem = {
  id: number
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

@Module({
  stateFactory: true,
  name: 'modules/notification',
  namespaced: true
})
export default class Notification extends VuexModule {
  private notifications: NotificationItem[] = []

  public get notificationsGetter() {
    return this.notifications
  }

  @Mutation
  public SET_NOTIFICATIONS(notifications: NotificationItem[]) {
    this.notifications = notifications
  }

  @Action
  public addNotifications(notifications: NotificationItem[]) {
    this.SET_NOTIFICATIONS([...this.notificationsGetter, ...notifications])
  }

  @Action
  public clearNotification() {
    this.SET_NOTIFICATIONS([])
  }

  @Action
  public deleteNotification(id: number) {
    this.SET_NOTIFICATIONS(this.notificationsGetter.filter((n) => n.id !== id))
  }
}
