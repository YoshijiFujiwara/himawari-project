<template>
  <v-card class="px-6 mainText--text">
    <v-card-title>
      <v-icon large left color="primary">
        mdi-account-group
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
          <v-combobox
            v-model="select"
            outlined
            multiple
            label="グループメンバー"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :rules="rules.emails"
            :search-input.sync="search"
            @keyup.tab="updateEmails"
            @paste="updateEmails"
          >
          </v-combobox>
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
      {{ select.find((v) => !/.+@.+\..+/.test(v)) }}
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
      select: [],
      search: '', // sync search
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
        ],
        emails: [
          (emails: string[]) =>
            !emails.length ||
            emails.filter((v) => /.+@.+\..+/.test(v)).length ===
              emails.length ||
            '形式が正しくないメールアドレスが含まれています'
        ]
      }
    }
  },
  methods: {
    updateEmails() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    async onSubmit() {
      this._startLoading()
      // グループの作成処理
      const createGroupResponse = await groupStore.createGroup({
        name: this.form.name
      })

      if (createGroupResponse.error && createGroupResponse.messages) {
        this._notifyyyy(
          createGroupResponse.messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
        this._finishLoading()
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
          this._notifyyyy(
            inviteUserResponse.messages.map((message: string) => ({
              message,
              type: 'warning'
            }))
          )
          this._finishLoading()
          return
        }
      }
      this.$router.push('/profile')
      this._finishLoading()
    }
  }
})
</script>

<style lang="scss" scoped>
.tag-input span.chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
}

.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
  padding-left: 7px;
}

.tag-input span.v-chip::before {
  content: 'label';
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
