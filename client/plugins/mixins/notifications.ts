import Vue from 'vue'
import { notificationStore } from '@/store/modules/notification'

const Notification = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        globalNotifications() {
          if (notificationStore.notifications.length > 0) {
            notificationStore.notifications.forEach((notification) => {
              let listMessage = ''
              notification.messages.forEach((message) => {
                listMessage += `・${message}<br/>`
              })
              // @ts-ignore
              this.$vs.notify({
                title: notification.title || undefined,
                text: listMessage,
                position: 'top-center',
                color: notification.color || 'primary',
                time: notification.time || 4000,
                icon: notification.icon || undefined
              })
            })
          }
          return notificationStore.notifications
        }
      }
    })
  }
}

Vue.use(Notification)
