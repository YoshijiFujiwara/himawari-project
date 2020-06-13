import Vue from 'vue'

type Position =
  | 'bottom-right'
  | 'top-right'
  | 'top-left'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-center'

type Notification = {
  title?: string
  messages: string[]
  time?: number
  color?: string
  icon?: string
  position?: Position
}

Vue.mixin({
  methods: {
    notify(notification: Notification) {
      let listMessage = ''
      notification.messages.forEach((message) => {
        listMessage += `・${message}<br/>`
      })
      this.$vs.notify({
        title: notification.title || undefined,
        text: listMessage,
        position: notification.position || 'top-center',
        color: notification.color || 'primary',
        time: notification.time || 4000,
        icon: notification.icon || undefined
      })
    }
  }
})
