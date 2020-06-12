import {
  Action,
  VuexModule,
  getModule,
  Module,
  Mutation
} from 'vuex-module-decorators'
import { buildApi, extractErrorMessages } from '../utils'
import { notificationStore } from './notification'
import store from '@/store/store'
import {
  AuthApi,
  SignUpUserDto,
  SignInUserDto,
  UserSerializer
} from '~/openapi'

const authApi = buildApi(AuthApi)

const LOCALSTORAGE_TOKEN_KEY = 'token'

export interface IAuthState {
  token: string | null
  user: UserSerializer | null
}

@Module({ dynamic: true, store, name: 'auth', namespaced: true })
export class AuthModule extends VuexModule implements IAuthState {
  token: string | null = null
  user: UserSerializer | null = null

  @Mutation
  public SET_TOKEN(token: string | null) {
    this.token = token
  }

  @Mutation
  public SET_USER(user: UserSerializer) {
    this.user = user
  }

  @Action({})
  public async signup(signUpUserDto: SignUpUserDto) {
    try {
      await authApi.authControllerSignUp(signUpUserDto)
      return true
    } catch (err) {
      const messages = extractErrorMessages(err)
      notificationStore.notify({
        messages,
        color: 'warning'
      })
    }
  }

  @Action({})
  public async signin(signInUserDto: SignInUserDto) {
    try {
      return await authApi.authControllerSignIn(signInUserDto)
    } catch (err) {
      const messages = extractErrorMessages(err)
      notificationStore.notify({
        messages,
        color: 'warning'
      })
    }
  }

  @Action({})
  public async confirmEmail(token: string) {
    try {
      await authApi.authControllerVerifyEmail(token)
      return true
    } catch (err) {
      const messages = extractErrorMessages(err)
      notificationStore.notify({
        messages,
        color: 'warning'
      })
    }
  }

  @Action({})
  public getToken() {
    if (this.token) return

    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
    if (token) {
      this.SET_TOKEN(token)
    } else {
      this.SET_TOKEN(null)
    }
  }

  @Action({})
  public setToken(token: string) {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
  }

  @Action({})
  public async getMe(token: string) {
    const authApiWithToken = buildApi(AuthApi, token || undefined)
    const res = await authApiWithToken.authControllerMe()
    const user: UserSerializer = res.data
    this.SET_USER(user)
  }
}

export const authStore = getModule(AuthModule)
