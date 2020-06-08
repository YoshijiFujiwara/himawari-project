<template>
  <vs-row vs-align="center" vs-w="8">
    <h2 class="form-title">Projectに登録</h2>
    <div class="input-container">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-button
          class="btn-google"
          color="primary"
          type="filled"
          vs-w="12"
          @click="onClickGoogleButton"
        >
          Googleアカウントでログイン
        </vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
          <hr class="hr-5" />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
          または
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
          <hr class="hr-5" />
        </vs-col>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="start" vs-w="12">
        <vs-input v-model="form.username" label="ユーザ名" />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="start" vs-w="12">
        <vs-input v-model="form.email" label="メールアドレス" />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="start" vs-w="12">
        <vs-input v-model="form.password" label="パスワード" />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="start" vs-w="12">
        <vs-checkbox v-model="form.isAgreed">利用規約に同意します</vs-checkbox>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="start" vs-w="12">
        <vs-button color="primary" type="filled" @click="onSubmit"
          >アカウントを作成する
        </vs-button>
      </vs-col>
    </div>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { authStore } from '@/store/modules/auth'

type Data = {
  form: {
    username: string
    email: string
    password: string
    isAgreed: boolean
  }
}
export default Vue.extend({
  data(): Data {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        isAgreed: false
      }
    }
  },
  methods: {
    async onSubmit(e: any) {
      alert('google')
      e.preventDefault()
      const res = await authStore.signup(this.form)
      if (res && res.status === 201) {
        this.form.username = ''
        this.form.email = ''
        this.form.password = ''

        this.$router.push('/mailsend')
      }
    },
    onClickGoogleButton() {
      alert('google')
    }
  }
})
</script>

<style lang="scss">
.form-title {
  font-size: 36px;
  color: #707070;
}
.input-container {
  .vs-col {
    margin-bottom: 20px;
    color: #777777;
    font-family: HiraginoSans-W5;
    .vs-input {
      width: 100%;
    }
    .btn-google {
      margin-top: 20px;
      width: 100%;
    }
    .hr-5 {
      width: 95%;
      vertical-align: middle;
      border: solid 1px #777777;
    }
    .vs-button-text {
      align-content: center;
    }
  }
}
</style>
