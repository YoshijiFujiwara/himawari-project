import { Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import { buildApi, extractErrorMessages } from '../utils'
import { notificationStore } from './notification'
import store from '@/store/store'
import { AuthApi, CreateUserDto } from '~/openapi'

const authApi = buildApi(AuthApi)

export interface IAuthState {}
@Module({ dynamic: true, store, name: 'auth', namespaced: true })
class AuthModule extends VuexModule implements IAuthState {
  @Action({})
  public async signup(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto
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
}

export const authStore = getModule(AuthModule)
