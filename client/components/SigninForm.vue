<template>
  <vs-row vs-align="center" vs-w="8">
    <h2 class="form-title">Projectにログイン</h2>
    <div class="input-container">
      <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="ユーザー名またはパスワード"
          >
            <vs-input
              v-model="form.usernameOrPassword"
              size="large"
              label="ユーザー名またはパスワード"
            />
            <InputError :errors="errors" />
          </validation-provider>
        </vs-col>
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="パスワード"
          >
            <vs-input v-model="form.password" size="large" label="パスワード" />
            <InputError :errors="errors" />
          </validation-provider>
        </vs-col>
        <vs-col>
          <p class="p-forget-pass">
            パスワードをお忘れの方は<nuxt-link to="/users/signin"
              >こちら</nuxt-link
            >
          </p>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-button
            color="primary"
            type="filled"
            vs-w="12"
            size="large"
            :disabled="invalid"
            @click="onSubmit"
            >ログイン
          </vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-divider>または</vs-divider>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-button
            class="btn-google"
            color="danger"
            type="filled"
            size="large"
            vs-w="12"
            @click="onClickGoogleButton"
          >
            Googleアカウントでログイン
          </vs-button>
        </vs-col>
      </validation-observer>
    </div>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'
import InputError from '@/components/InputError.vue'

type Data = {
  form: {
    usernameOrPassword: string
    password: string
  }
}
export default Vue.extend({
  components: {
    InputError
  },
  data(): Data {
    return {
      form: {
        usernameOrPassword: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      // TODO: APIとの繋ぎ込み
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
    .vs-button-text {
      align-content: center;
    }
    .vs-button {
      margin-top: 20px;
      width: 100%;
    }
    .p-forget-pass {
      margin-top: 20px;
      font-size: 12px;
    }
  }
}
</style>
