import Vue from 'vue'
import { Notification } from '~/plugins/mixins/notification'

declare module 'vuesax' {}

declare module 'vue/types/vue' {
  interface Vue {
    $vs: any // vuesax custom plugin
    notify: (notification: Notification) => void
  }
}
