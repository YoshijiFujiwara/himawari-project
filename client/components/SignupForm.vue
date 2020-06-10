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
      <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
        <div class="form_height">
          <vs-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required|min:5|max:20"
              name="ユーザー名"
            >
              <vs-input v-model="form.username" label="ユーザ名" />
              <span v-if="errors.length" class="help is-danger">
                {{ errors[0] }}
              </span>
              <span v-else class="help is-clear"><br /></span>
            </validation-provider>
          </vs-col>
        </div>
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="メールアドレス"
          >
            <vs-input v-model="form.email" label="メールアドレス" />
            <span v-if="errors.length" class="help is-danger">
              {{ errors[0] }}
            </span>
            <span v-else class="help is-clear"><br /></span>
          </validation-provider>
        </vs-col>
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required|min:6|max:20"
            name="パスワード"
          >
            <vs-input v-model="form.password" label="パスワード" />
            <span v-if="errors.length" class="help is-danger">
              {{ errors[0] }}
            </span>
            <span v-else class="help is-clear"><br /></span>
          </validation-provider>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="start" vs-w="12">
          <validation-provider rules="required:true" name="同意">
            <vs-checkbox v-model="form.isAgreed" icon="✓" vs-value="ok"
              >利用規約に同意します</vs-checkbox
            >
          </validation-provider>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="start" vs-w="12">
          <vs-button
            color="primary"
            type="filled"
            :disabled="invalid"
            @click="onSubmit"
            >アカウントを作成する
          </vs-button>
        </vs-col>
      </validation-observer>
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
    isAgreed: string | undefined
  }
}
export default Vue.extend({
  data(): Data {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        isAgreed: undefined
      }
    }
  },
  methods: {
    async onSubmit() {
      const result = await authStore.signup(this.form)
      if (result) {
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
    margin-bottom: 10px;
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
.is-danger {
  display: block;
  padding-top: 3px;
  color: #fa0000;
}
.is-clear {
  display: block;
  padding-top: 3px;
  color: #ffffff;
}
</style>
