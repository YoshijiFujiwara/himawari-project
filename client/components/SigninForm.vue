<template>
  <vs-row vs-align="center" vs-w="8">
    <h2 class="form-title">Projectにログイン</h2>
    <div class="input-container">
      <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
        <vs-col>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="ユーザー名またはメールアドレス"
          >
            <vs-input
              v-model="form.usernameOrEmail"
              size="large"
              label="ユーザー名またはメールアドレス"
              class="test"
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
            <vs-input
              v-model="form.password"
              size="large"
              label="パスワード"
              type="password"
            />
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
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          class="vs-col-google"
        >
          <vs-button
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
import { buildApiUrl } from '@/store/utils'
import InputError from '@/components/InputError.vue'
import { authStore } from '@/store'

type Data = {
  form: {
    usernameOrEmail: string
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
        usernameOrEmail: '',
        password: ''
      }
    }
  },
  methods: {
    isEmail() {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return reg.test(this.form.usernameOrEmail)
    },
    async onSubmit() {
      const { usernameOrEmail, password } = this.form
      const [username, email] = this.isEmail()
        ? [undefined, usernameOrEmail]
        : [usernameOrEmail, undefined]

      this.$vs.loading()
      const { error, messages } = await authStore.signin({
        username,
        email,
        password
      })
      this.$vs.loading.close()

      if (error && messages) {
        this.notify({
          messages,
          color: 'warning'
        })
      } else {
        this.$router.push('/profile')
      }
    },
    onClickGoogleButton() {
      const apiUrl = buildApiUrl()
      window.location.href = `${apiUrl}/api/auth/google`
    }
  }
})
</script>

<style lang="scss" scoped>
.form-title {
  font-size: calc(20px + 1vw);
  color: #707070;
}
.input-container {
  margin-top: 25px;
  .vs-col {
    margin-bottom: 20px;
    color: #777777;
    font-family: HiraginoSans-W5;
    .vs-input {
      width: 100%;
      .vs-input--label {
        font-size: 40px;
      }
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
  .vs-col-google {
    margin-top: -15px;
  }
}
</style>
