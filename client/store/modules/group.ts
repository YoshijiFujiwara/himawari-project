import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { authStore } from '../store-accessor'
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
  CommentsApi,
  CreateCommentDto,
  AssignGoalDto,
  InviteUsersDto,
  BulkAssignGoalsDto
} from '~/openapi'

const groupApi = () => buildApi(GroupsApi)
const timelinesApi = () => buildApi(TimelinesApi)
const commentsApi = () => buildApi(CommentsApi)

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
        this.SET_GROUPS([...this.groupsGetter, res.data])
        // サイドナビゲーションのグループ一覧のデータ反映
        authStore.getMe()
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

  @Action
  public async createComment({
    timelineId,
    createCommentDto
  }: {
    timelineId: number
    createCommentDto: CreateCommentDto
  }) {
    return await commentsApi()
      .commentsControllerCreateComment(timelineId, createCommentDto)
      .then((res) => {
        const newComment = res.data
        const timelines = this.timelinesGetter

        // 該当のタイムラインにコメントを追加する
        this.SET_TIMELINES(
          timelines.map((t) => {
            if (t.id === timelineId) {
              return {
                ...t,
                comments: [...t.comments!, newComment]
              }
            }
            return t
          })
        )
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async assignGoal({
    groupId,
    assignGoalDto
  }: {
    groupId: number
    assignGoalDto: AssignGoalDto
  }) {
    return await groupApi()
      .groupsControllerAssignGoal(groupId, assignGoalDto)
      .then((res) => {
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }

  @Action
  public async bulkAssignGoals({
    groupId,
    bulkAssignGoalsDto
  }: {
    groupId: number
    bulkAssignGoalsDto: BulkAssignGoalsDto
  }) {
    return await groupApi()
      .groupsControllerBulkAssignGoals(groupId, bulkAssignGoalsDto)
      .then((res) => {
        this.SET_GROUP(res.data)
        return resSuccess(res)
      })
      .catch((e) => resError(e))
  }
}
