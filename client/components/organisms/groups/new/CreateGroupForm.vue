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
          <v-combobox
            v-model="form.emails"
            outlined
            multiple
            label="グループメンバー(メールアドレス)"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :rules="rules.emails"
            :search-input.sync="inputtingEmail"
          >
          </v-combobox>
          <v-btn
            large
            color="primary"
            :disabled="!valid || !!inputtingEmail"
            block
            @click="onSubmit"
            >グループを作成</v-btn
          >
          <p class="text-center mt-6">後でメンバーを追加する</p>
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
        emails: []
      },
      inputtingEmail: '',
      rules: {
        name: [
          (v: string) => !!v || 'グループ名は必須です',
          (v: string) =>
            (v && v.length <= 20) || 'グループ名は20文字以内で入力してください'
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
    async onSubmit() {
      this._startLoading()
      // グループの作成処理
      const { res, error, messages } = await groupStore.createGroup(this.form)
      if (error && messages) {
        this._notifyyyy(
          messages.map((message: string) => ({
            message,
            type: 'warning'
          }))
        )
        this._finishLoading()
        return
      }

      this.$router.push(`/groups/${res.data.id}`)
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
