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
import { AuthApi, SignUpUserDto } from '~/openapi'

const authApi = buildApi(AuthApi)

const LOCALSTORAGE_TOKEN_KEY = 'token'

export interface IAuthState {
  token: string | null
}

@Module({ dynamic: true, store, name: 'auth', namespaced: true })
class AuthModule extends VuexModule implements IAuthState {
  token: string | null = null

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token
  }

  @Action({})
  public async signup(signUpUserDto: SignUpUserDto) {
    const { email, username, password } = signUpUserDto
    try {
      await authApi.authControllerSignUp({
        email,
        username,
        password
      })
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

  /**
   * ローカルストレージからトークンを取得する
   */
  @Action({})
  public getToken() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
    if (token) {
      this.SET_TOKEN(token)
    } else {
      this.SET_TOKEN(null)
    }
  }

  /**
   * ローカルストレージにトークンをセットする
   */
  @Action({})
  public setToken(token: string) {
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
  }
}

export const authStore = getModule(AuthModule)
