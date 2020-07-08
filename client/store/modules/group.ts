import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { buildApi, resSuccess, resError } from '@/store/utils'
import {
  GroupsApi,
  GroupSerializer,
  InviteUserDto,
  CreateGroupDto
} from '~/openapi'

const groupApi = () => buildApi(GroupsApi)

@Module({
  stateFactory: true,
  name: 'modules/group',
  namespaced: true
})
export default class Group extends VuexModule {
  private group: GroupSerializer | null = null
  private groups: GroupSerializer[] = []

  public get groupGetter() {
    return this.group
  }

  public get groupsGetter() {
    return this.groups
  }

  @Mutation
  public SET_GROUP(group: GroupSerializer) {
    this.group = group
  }

  @Mutation
  public SET_GROUPS(groups: GroupSerializer[]) {
    this.groups = groups
  }

  @Action
  public async createGroup(createGroupDto: CreateGroupDto) {
    return await groupApi()
      .groupsControllerCreateGroup(createGroupDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getGroups() {
    return await groupApi()
      .groupsControllerGetGroups()
      .then((res) => {
        this.SET_GROUPS(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async inviteUser({
    groupId,
    inviteUserDto
  }: {
    groupId: number
    inviteUserDto: InviteUserDto
  }) {
    return await groupApi()
      .groupsControllerInviteUser(groupId, inviteUserDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
