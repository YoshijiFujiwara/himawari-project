<template>
  <vs-row vs-align="center" vs-w="8">
    <h2 class="form-title">Projectに登録</h2>
    <div class="input-container">
      <vs-col>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="ユーザー名"
        >
          <vs-input v-model="form.username" label="ユーザ名" />
          <span v-show="errors.length" class="help is-danger">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </vs-col>
      <vs-col>
        <validation-provider
          v-slot="{ errors }"
          rules="required|email"
          name="メールアドレス"
        >
          <vs-input v-model="form.email" label="メールアドレス" />
          <span v-show="errors.length" class="help is-danger">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </vs-col>
      <vs-col>
        <validation-provider
          v-slot="{ errors }"
          rules="required|min:6|max:20"
          name="パスワード"
        >
          <vs-input v-model="form.password" label="パスワード" />
          <span v-show="errors.length" class="help is-danger">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="start" vs-w="12">
        <vs-checkbox v-model="form.isAgreed" icon="✓"
          >利用規約に同意します</vs-checkbox
        >
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
      e.preventDefault()
      const res = await authStore.signup(this.form)
      if (res && res.status === 201) {
        this.form.username = ''
        this.form.email = ''
        this.form.password = ''

        this.$router.push('/mailsend')
      }
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
    .vs-input {
      width: 100%;
    }
  }
}
.is-danger {
  display: block;
  padding-top: 3px;
  color: #fa0000;
}
</style>
