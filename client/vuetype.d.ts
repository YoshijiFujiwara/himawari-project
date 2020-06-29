import Vue from 'vue'
import { UserSerializer } from './openapi'
import { NotificationItem } from '~/store/modules/notification'

declare module 'vue/types/vue' {
  interface Vue {
    Iam: UserSerializer
    isLoggedIn: boolean
    _isSP: boolean
    _isPC: boolean
    _startLoading: () => void
    _finishLoading: () => void
    _notifyyyy: (
      notifications: Array<Pick<NotificationItem, 'message' | 'type'>>
    ) => void
    _deleteNotification: (id: number) => void
  }
}
