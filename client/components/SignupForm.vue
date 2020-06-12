<template>
  <vs-row vs-align="center" vs-w="8" vs-lg="8" vs-sm="8" vs-xs="10">
    <h2 class="form-title">Projectに登録</h2>
    <div class="input-container">
      <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
        <div class="form_height">
          <vs-col>
            <validation-provider
              v-slot="{ errors }"
              rules="required|min:5|max:20"
              name="ユーザー名"
            >
              <vs-input v-model="form.username" label="ユーザ名" size="large" />
              <InputError :errors="errors" />
            </validation-provider>
          </vs-col>
        </div>
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="メールアドレス"
          >
            <vs-input
              v-model="form.email"
              label="メールアドレス"
              size="large"
            />
            <InputError :errors="errors" />
          </validation-provider>
        </vs-col>
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required|min:6|max:20"
            name="パスワード"
          >
            <vs-input
              v-model="form.password"
              type="password"
              label="パスワード"
              size="large"
            />
            <InputError :errors="errors" />
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
            size="large"
            color="rgb(25, 150, 254)"
            type="filled"
            :disabled="invalid"
            @click="onSubmit"
            >アカウントを作成
          </vs-button>
        </vs-col>
      </validation-observer>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-divider>または</vs-divider>
      </vs-col>

      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-button
          size="large"
          class="btn-google"
          color="danger"
          type="filled"
          vs-w="12"
          @click="onClickGoogleButton"
        >
          Googleアカウントでログイン
        </vs-button>
      </vs-col>
    </div>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import InputError from '@/components/InputError.vue'
import { authStore } from '@/store/modules/auth'
import { buildApiUrl } from '@/store/utils'
import { loadingStore } from '@/store/modules/loading'

type Data = {
  form: {
    username: string
    email: string
    password: string
    isAgreed: string | undefined
  }
}
export default Vue.extend({
  components: {
    InputError
  },
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
      loadingStore.startLoading()
      const result = await authStore.signup(this.form)
      loadingStore.endLoading()
      if (result) {
        this.form.username = ''
        this.form.email = ''
        this.form.password = ''

        this.$router.push('/mailsend')
      }
    },
    onClickGoogleButton() {
      const apiUrl = buildApiUrl()
      window.location.href = `${apiUrl}/api/auth/google`
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
    .vs-button {
      width: 100%;
    }
  }
}
</style>
