import { NuxtAxiosInstance } from '@nuxtjs/axios'
import colors from 'vuetify/es5/util/colors'

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
    apiUrl: process.env.API_URL,
    cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    '@/plugins/axios-accessor.ts',
    '@/plugins/filter.ts',
    '@/plugins/mixins/auth.ts',
    '@/plugins/mixins/goal.ts',
    '@/plugins/mixins/loading.ts',
    '@/plugins/mixins/notifications.ts',
    '@/plugins/mixins/responsive.ts',
    '@/plugins/mixins/jdenticon.ts'
  ],

  router: {
    extendRoutes(routes: any, resolve: any) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
    }
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
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
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          // 基本の色
          primary: '#1996fe',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: '#F2135D',
          success: colors.green.accent3,

          // テキスト
          mainText: '#707070', // メインテキストカラー

          // 背景色
          topPageBg: '#b6ddf2', // トップページの背景色
          signinBg: '#ff896e', // ログインページの背景色
          signupBg: '#b6ddf2', // ユーザー登録ページの背景色
          mainBg: '#eff7ff', // ログインしたあとのメインの背景色
          commitTableHeaderBg: '#f6f6f6', // 学習記録テーブルのヘッダー
          cardGreyBg: '#f5f5f5',
          orangeBg: '#ffdab4',
          yellowBg: '#fffba7',
          groupAssociationBg: '#fffcd5', // グループ関連付け欄の背景色
          searchListBg: '#f9f9f9', // 検索ページの左側カラム背景色

          // ボタン
          googleBtn: '#db4f47', // グーグルボタンの色
          yearGreyBtn: '#979797',

          // ステータス
          challengingColor: '#ffa84c',
          chipBg: '#f2f1f2',
          satisfyIcon: '#ffa84c'
        }
      }
    }
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
    }
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
