import Vue from 'vue'
import { authStore } from '~/store/modules/auth'

const Auth = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        Iam() {
          return authStore.user
        }
      }
    })
  }
}

Vue.use(Auth)
