import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { UserSerializer, UsersApi } from '~/openapi'
import {
  ActionAxiosResponse,
  buildApi,
  resError,
  resSuccess
} from '@/store/utils'

const userApi = () => buildApi(UsersApi)

@Module({
  stateFactory: true,
  name: 'modules/user',
  namespaced: true
})
export default class User extends VuexModule {
  private user: UserSerializer | null = null

  public get userGetter() {
    return this.user
  }

  @Mutation
  public SET_USER(user: UserSerializer) {
    this.user = user
  }

  @Action
  public async getUser(userId: number): Promise<ActionAxiosResponse> {
    return await userApi()
      .usersControllerGetUser(userId)
      .then((res) => {
        this.SET_USER(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
