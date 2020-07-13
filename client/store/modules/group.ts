import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import {
  buildApi,
  resSuccess,
  resError,
  ActionAxiosResponse
} from '@/store/utils'
import {
  GroupsApi,
  TimelinesApi,
  GroupSerializer,
  TimelineSerializer,
  InviteUserDto,
  CreateGroupDto,
  InviteUsersDto
} from '~/openapi'

const groupApi = () => buildApi(GroupsApi)
const timelinesApi = () => buildApi(TimelinesApi)

@Module({
  stateFactory: true,
  name: 'modules/group',
  namespaced: true
})
export default class Group extends VuexModule {
  private group: GroupSerializer | null = null
  private groups: GroupSerializer[] = []
  private timelines: TimelineSerializer[] = []

  public get timelinesGetter() {
    return this.timelines
  }

  public get groupGetter() {
    return this.group
  }

  public get groupsGetter() {
    return this.groups
  }

  @Mutation
  public SET_TIMELINES(timelines: TimelineSerializer[]) {
    this.timelines = timelines
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
  public async getGroup(id: number) {
    return await groupApi()
      .groupsControllerGetGroup(id)
      .then((res) => {
        this.SET_GROUP(res.data)
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

  @Action
  public async inviteUsers({
    groupId,
    inviteUsersDto
  }: {
    groupId: number
    inviteUsersDto: InviteUsersDto
  }) {
    return await groupApi()
      .groupsControllerInviteUsers(groupId, inviteUsersDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async getTimeline(id: number): Promise<ActionAxiosResponse> {
    return await timelinesApi()
      .timelinesControllerGetTimelines(id)
      .then((res) => {
        this.SET_TIMELINES(res.data)
        return resSuccess(res)
      })
      .catch((e) => {
        this.SET_TIMELINES([])
        return resError(e)
      })
  }
}
