import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}

export default {
  mode: 'spa',
  /**
   * 環境変数
   */
  env: {
    notSkaffold: process.env.NOT_SKAFFOLD,
    apiUrl: process.env.API_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['vuesax/dist/vuesax.css'],
  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    '@/plugins/vuesax',
    '@/plugins/vee-validate.ts',
    '@/plugins/mixins/notification.ts'
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: '/'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    transpile: ['vee-validate/dist/rules']
  },
  /**
   * docker-composeでホットリロードが効かない問題の修正
   * [FYI] https://github.com/nuxt/nuxt.js/issues/2481#issuecomment-356074552
   */
  watchers: {
    webpack: {
      poll: true
    }
  }
}
