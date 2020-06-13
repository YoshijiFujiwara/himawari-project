import {
  Action,
  VuexModule,
  getModule,
  Module,
  Mutation
} from 'vuex-module-decorators'
import {
  buildApi,
  extractErrorMessages,
  ActionAxiosResponse
} from '@/store/utils'
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
  public async signup(
    signUpUserDto: SignUpUserDto
  ): Promise<ActionAxiosResponse> {
    const res = await authApi
      .authControllerSignUp(signUpUserDto)
      .catch((e) => e)

    if (res.status === 201) {
      return {
        res,
        error: false,
        messages: null
      }
    } else {
      const messages = extractErrorMessages(res)
      return {
        res,
        error: true,
        messages
      }
    }
  }

  @Action({})
  public async signin(
    signInUserDto: SignInUserDto
  ): Promise<ActionAxiosResponse> {
    const res = await authApi
      .authControllerSignIn(signInUserDto)
      .catch((e) => e)

    // TODO: 200が返るはずだが、201が返却されている。APIが修正されたら、こちらも修正する
    if (res.status === 201) {
      return {
        res,
        error: false,
        messages: null
      }
    } else {
      const messages = extractErrorMessages(res)
      return {
        res,
        error: true,
        messages
      }
    }
  }

  @Action({})
  public async confirmEmail(token: string): Promise<ActionAxiosResponse> {
    const res = await authApi.authControllerVerifyEmail(token).catch((e) => e)

    if (res.status === 200) {
      return {
        res,
        error: false,
        messages: null
      }
    } else {
      const messages = extractErrorMessages(res)
      return {
        res,
        error: true,
        messages
      }
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
