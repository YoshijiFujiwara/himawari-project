import { Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import { buildApi } from '../utils'
import store from '@/store/store'
import { AuthApi, CreateUserDto } from '~/openapi'

const authApi = buildApi(AuthApi)

export interface IAuthState {}
@Module({ dynamic: true, store, name: 'auth', namespaced: true })
class AuthStore extends VuexModule implements IAuthState {
  @Action({})
  public async signup(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto
    const res = await authApi.authControllerSignUp({
      email,
      username,
      password
    })
    console.log(res)
  }
}

export const authStore = getModule(AuthStore)
