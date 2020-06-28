import Vue from 'vue'
import { loadingStore } from '~/store'

const Loading = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        nowLoading() {
          return loadingStore.nowLoadingGetter
        }
      },
      methods: {
        _startLoading() {
          loadingStore.startLoading()
        },
        _finishLoading() {
          loadingStore.finishLoading()
        }
      }
    })
  }
}

Vue.use(Loading)
