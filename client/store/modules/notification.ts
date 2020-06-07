import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import store from '@/store/store'

export interface INotificationState {
  messages: string[]
}

@Module({ dynamic: true, store, name: 'notification', namespaced: true })
class NotificationModule extends VuexModule implements INotificationState {
  // state
  messages: string[] = []

  @Mutation
  public SET_MESSAGES(messages: string[]) {
    this.messages = messages
  }

  @Action({})
  public addMessages(messages: string[]) {
    this.SET_MESSAGES([...this.messages, ...messages])
  }

  @Action({})
  public clearMessages() {
    this.SET_MESSAGES([])
  }
}

export const notificationStore = getModule(NotificationModule)
