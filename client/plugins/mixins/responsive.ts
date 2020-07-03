import Vue from 'vue'

const Responsive = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        _isSP(): boolean {
          // @ts-ignore
          return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
        },
        _isPC(): boolean {
          // @ts-ignore
          return !this.$vuetify.breakpoint.xs && !this.$vuetify.breakpoint.sm
        }
      }
    })
  }
}

Vue.use(Responsive)
