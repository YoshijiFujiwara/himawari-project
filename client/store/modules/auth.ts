import { Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import { buildApi, extractErrorMessages } from '../utils'
import { notificationStore } from './notification'
import store from '@/store/store'
import { AuthApi, SignUpUserDto, SignInUserDto } from '~/openapi'

const authApi = buildApi(AuthApi)

export interface IAuthState {}
@Module({ dynamic: true, store, name: 'auth', namespaced: true })
class AuthModule extends VuexModule implements IAuthState {
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
  public async signin(signInUserDto: SignInUserDto) {
    try {
      await authApi.authControllerSignIn(signInUserDto)
      const res = authApi.authControllerSignIn(signInUserDto)
      return res
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
}

export const authStore = getModule(AuthModule)
