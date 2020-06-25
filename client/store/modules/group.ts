import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { buildApi, resSuccess, resError } from '@/store/utils'
import { GroupsApi, GroupSerializer, InviteUserDto } from '~/openapi'

const groupApi = () => buildApi(GroupsApi)

@Module({
  stateFactory: true,
  name: 'modules/group',
  namespaced: true
})
export default class Group extends VuexModule {
  private group: GroupSerializer | null = null

  public get groupGetter() {
    return this.group
  }

  @Mutation
  public SET_GROUP(group: GroupSerializer) {
    this.group = group
  }

  // TODO: ここにグループ作成のAPIを追加する

  @Action
  public async inviteUser(groupId: number, inviteUserDto: InviteUserDto) {
    return await groupApi()
      .groupsControllerInviteUser(groupId, inviteUserDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
