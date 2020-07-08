import { Action, VuexModule, Module, Mutation } from 'vuex-module-decorators'
import {
  buildApi,
  ActionAxiosResponse,
  resSuccess,
  resError
} from '@/store/utils'
import {
  AuthApi,
  SignUpUserDto,
  SignInUserDto,
  UserSerializer,
  UpdateMeDto
} from '~/openapi'
import { $axios } from '~/utils/api'

const authApi = () => buildApi(AuthApi)

@Module({
  stateFactory: true,
  name: 'modules/auth',
  namespaced: true
})
export default class Auth extends VuexModule {
  private user: UserSerializer | null = null

  public get userGetter() {
    return this.user
  }

  public get isLoggedIn() {
    return !!this.user
  }

  public get isNOTLoggedIn() {
    return !this.user
  }

  @Mutation
  public SET_USER(user: UserSerializer) {
    this.user = user
  }

  @Mutation
  public CLEAR_USER() {
    this.user = null
  }

  @Action
  public saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  @Action
  public async signup(
    signUpUserDto: SignUpUserDto
  ): Promise<ActionAxiosResponse> {
    return await authApi()
      .authControllerSignUp(signUpUserDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async signin(
    signInUserDto: SignInUserDto
  ): Promise<ActionAxiosResponse> {
    return await authApi()
      .authControllerSignIn(signInUserDto)
      .then(async (res) => {
        this.saveToken(res.data.accessToken)
        await this.getMe()
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public logout() {
    this.CLEAR_USER()
    localStorage.removeItem('token')
    // @ts-ignore
    // eslint-disable-next-line no-undef
    $nuxt.$router.push('/auth/signin')
  }

  @Action
  public async confirmEmail(token: string): Promise<ActionAxiosResponse> {
    return await authApi()
      .authControllerVerifyEmail(token)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  async getMe(): Promise<ActionAxiosResponse> {
    return await authApi()
      .authControllerMe()
      .then((res) => {
        this.SET_USER(res.data)
        return resSuccess(res)
      })
      .catch((e) => {
        this.logout()
        return resError(e)
      })
  }

  @Action
  async updateMe({
    image,
    username,
    statusMessage
  }: {
    image?: File
    username: UpdateMeDto['username']
    statusMessage?: UpdateMeDto['statusMessage']
  }) {
    // まず、画像がある場合にはcloudinaryに画像のアップロードをする
    let avatarUrl
    if (image) {
      const data = new FormData()
      data.append('file', image)
      data.append('upload_preset', process.env.cloudinaryUploadPreset!)
      data.append('cloud_name', process.env.cloudinaryCloudName!)

      $axios.setBaseURL(
        `https://api.cloudinary.com/v1_1/${process.env.cloudinaryCloudName!}/`
      )
      const res = await $axios.$post('/image/upload', data)
      avatarUrl = res.url
    }

    return await authApi()
      .authControllerUpdateMe({
        avatarUrl,
        username,
        statusMessage
      })
      .then((res) => {
        console.log('success')
        console.log(res)
        return resSuccess(res)
      })
      .catch((e) => {
        console.log('error')
        return resError(e)
      })
  }
}
