import Vue from 'vue'
import { notificationStore } from '~/store'
import { NotificationItem } from '~/store/modules/notification'

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const Notifications = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        notifications() {
          return notificationStore.notificationsGetter
        }
      },
      methods: {
        notifyyyy(
          notifications: Array<Pick<NotificationItem, 'message' | 'type'>>
        ) {
          notifications.forEach((notification) => {
            const id = getRandomInt(1000)
            notificationStore.addNotifications([
              {
                id,
                ...notification
              }
            ])
            setTimeout(() => {
              notificationStore.deleteNotification(id)
            }, 5000)
          })
        },
        clearNotifications() {
          notificationStore.clearNotification()
        }
      }
    })
  }
}

Vue.use(Notifications)
