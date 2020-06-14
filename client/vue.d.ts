import Vue from 'vue'
import { UserSerializer } from './openapi'
import { Notification } from '~/plugins/mixins/notification'

declare module 'vue/types/vue' {
  interface Vue {
    $vs: any // vuesax custom plugin
    notify: (notification: Notification) => void
    Iam: UserSerializer
    isLoggedIn: boolean
  }
}
