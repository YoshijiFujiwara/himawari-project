<template>
  <v-card class="px-6 mainText--text">
    <v-card-title>
      <v-icon large left color="primary">
        group
      </v-icon>
      <span class="title font-weight-bold">グループを作成する</span>
    </v-card-title>
    <v-row>
      <v-col cols="12" md="6">
        <p>
          Projectは、グループを作成し、シェアすることでお互いを応援し
          合うことができ、最大の効果を発揮できます。
        </p>
        <v-form v-model="valid">
          <v-text-field
            v-model="form.name"
            label="グループ名前"
            :rules="rules.name"
            outlined
            required
          >
          </v-text-field>
          <v-text-field
            v-model="form.email"
            label="グループメンバー"
            :rules="rules.email"
            outlined
          >
          </v-text-field>
          <v-btn
            large
            color="primary"
            :disabled="!valid"
            block
            @click="onSubmit"
            >グループを作成</v-btn
          >
          <p class="text-center mt-6">後で行う</p>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <v-img :src="require('@/assets/group_img.png')" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupStore } from '@/store'

type Data = {
  form: any
}
export default Vue.extend({
  data() {
    return {
      valid: false,
      form: {
        name: '',
        email: ''
      },
      rules: {
        name: [
          (v: string) => !!v || 'グループ名は必須です',
          (v: string) =>
            (v && v.length <= 20) || 'グループ名は20文字以内で入力してください'
        ],
        email: [
          (v: string) =>
            !v ||
            /.+@.+\..+/.test(v) ||
            'メールアドレスの形式が正しくありません'
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      this.startLoading()
      // グループの作成処理
      const createGroupResponse = await groupStore.createGroup({
        name: this.form.name
      })

      if (createGroupResponse.error && createGroupResponse.messages) {
        this.notifyyyy(
          createGroupResponse.messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
        this.finishLoading()
        return
      }

      // 招待処理
      if (this.form.email) {
        // 上で作成したグループ情報を取得
        const newGroup = createGroupResponse.res.data
        const inviteUserResponse = await groupStore.inviteUser({
          groupId: newGroup.id,
          inviteUserDto: {
            email: this.form.email
          }
        })
        if (inviteUserResponse.error && inviteUserResponse.messages) {
          this.notifyyyy(
            inviteUserResponse.messages.map((message: string) => ({
              message,
              type: 'warning'
            }))
          )
          this.finishLoading()
          return
        }
      }
      this.$router.push('/profile')
      this.finishLoading()
    }
  }
})
</script>
