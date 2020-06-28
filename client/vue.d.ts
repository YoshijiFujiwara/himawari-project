import { UserSerializer } from './openapi'
import { NotificationItem } from '~/store/modules/notification'

declare module 'vue' {}

declare module 'vue/types/vue' {
  interface Vue {
    Iam: UserSerializer
    isLoggedIn: boolean
    startLoading: Function
    finishLoading: Function
    notifyyyy: (
      notifications: Array<Pick<NotificationItem, 'message' | 'type'>>
    ) => void
    _deleteNotification: (id: number) => void
  }
}
