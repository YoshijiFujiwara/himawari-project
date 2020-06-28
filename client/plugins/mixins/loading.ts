import Vue from 'vue'
import { loadingStore } from '~/store'

const Auth = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        nowLoading() {
          return loadingStore.nowLoadingGetter
        }
      },
      methods: {
        startLoading() {
          loadingStore.startLoading()
        },
        finishLoading() {
          loadingStore.finishLoading()
        }
      }
    })
  }
}

Vue.use(Auth)
