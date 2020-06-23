import Vue from 'vue'

const Colors = {
  install(Vue: any, _: any) {
    Vue.mixin({
      data() {
        return {
          themeColors: {
            primary: '#1996fe',
            success: 'rgb(23, 201, 100)',
            danger: '#D00505',
            warning: 'rgb(255, 130, 0)',
            dark: 'rgb(36, 33, 69)',
            googleButton: '#db4e45'
          }
        }
      }
    })
  }
}

Vue.use(Colors)
