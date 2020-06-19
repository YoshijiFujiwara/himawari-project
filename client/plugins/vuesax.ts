import Vue from 'vue'
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css'

Vue.use(Vuesax as any, {
  theme: {
    colors: {
      primary: '#1996fe',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
      warning: 'rgb(255, 130, 0)',
      dark: 'rgb(36, 33, 69)'
    }
  }
})
