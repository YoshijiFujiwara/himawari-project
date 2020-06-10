import Vue from 'vue'
import { loadingStore } from '@/store/modules/loading'

const Loading = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        globalLoading() {
          const { nowLoading, type } = loadingStore.loading
          if (nowLoading) {
            // @ts-ignore
            this.$vs.loading({
              type
            })
          } else {
            // @ts-ignore
            this.$vs.loading.close()
          }

          return loadingStore.loading
        }
      }
    })
  }
}

Vue.use(Loading)
