import Vue from 'vue'
import { authStore } from '~/store'

const Auth = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        Iam() {
          return authStore.userGetter
        },
        isLoggedIn() {
          return authStore.isLoggedIn
        }
      }
    })
  }
}

Vue.use(Auth)
