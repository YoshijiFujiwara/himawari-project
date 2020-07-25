import Vue from 'vue'
import jdenticon from 'jdenticon'

const Jdenticon = {
  install(Vue: any, _: any) {
    Vue.mixin({
      methods: {
        jdenticonSvg(email: string) {
          jdenticon.config = {
            backColor: '#FFFFFF'
          }
          const svgString = jdenticon.toSvg(email, 640)
          return svgString
        }
      }
    })
  }
}

Vue.use(Jdenticon)
