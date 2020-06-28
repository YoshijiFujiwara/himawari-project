import { UserSerializer } from './openapi'
import Vue from '~/vuesax'
import { Notification } from '~/plugins/mixins/notification'
import { NotificationItem } from '~/store/modules/notification'

declare module 'vuesax' {}

declare module 'vue/types/vue' {
  interface Vue {
    $vs: any // vuesax custom plugin
    notify: (notification: Notification) => void
    Iam: UserSerializer
    isLoggedIn: boolean
    startLoading: Function
    finishLoading: Function
    notifyyyy: (
      notifications: Array<Pick<NotificationItem, 'message' | 'type'>>
    ) => void
  }
}
