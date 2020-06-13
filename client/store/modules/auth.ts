import { Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  extractErrorMessages,
  ActionAxiosResponse
} from '@/store/utils'
import store from '@/store/store'
import { AuthApi, SignUpUserDto, SignInUserDto } from '~/openapi'

const authApi = buildApi(AuthApi)

export interface IAuthState {}
@Module({ dynamic: true, store, name: 'auth', namespaced: true })
class AuthModule extends VuexModule implements IAuthState {
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
}

export const authStore = getModule(AuthModule)
