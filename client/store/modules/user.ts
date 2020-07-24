import { VuexModule, Module } from 'vuex-module-decorators'
// import { buildApi } from '@/store/utils'
// import { UsersApi } from '~/openapi'

// const userApi = () => buildApi(UsersApi)

@Module({
  stateFactory: true,
  name: 'modules/user',
  namespaced: true
})
export default class User extends VuexModule {}
