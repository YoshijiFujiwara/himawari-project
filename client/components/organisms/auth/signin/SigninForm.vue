<template>
  <vs-col vs-type="flex" vs-justify="center" vs-lg="12" vs-sm="12" vs-xs="12">
    <vs-row vs-align="center" vs-w="8">
      <h2 class="form-title">Projectにログイン</h2>
      <div class="input-container">
        <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
          <vs-col>
            <InputWithValidation
              v-model="form.usernameOrEmail"
              rules="required"
              label="ユーザー名またはメールアドレス"
            />
          </vs-col>
          <vs-col>
            <InputWithValidation
              v-model="form.password"
              rules="required"
              type="password"
              label="パスワード"
            />
          </vs-col>
          <vs-col>
            <p class="p-forget-pass">
              パスワードをお忘れの方はこちら
            </p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="start" vs-w="12">
            <SubmitButton
              text="ログイン"
              color="primary"
              :disabled="invalid"
              :on-click="onSubmit"
            />
          </vs-col>
        </validation-observer>
        <Divider text="または" />
        <vs-col
          class="col-google-btn"
          vs-type="flex"
          vs-justify="start"
          vs-w="12"
        >
          <!-- Googleボタンの色はdangerではない -->
          <SubmitButton
            text="Googleアカウントでログイン"
            :color="themeColors.googleButton"
            :on-click="onClickGoogleButton"
          />
        </vs-col>
      </div>
    </vs-row>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { buildApiUrl } from '@/store/utils'
import InputWithValidation from '@/components/molecules/InputWithValidation.vue'
import SubmitButton from '@/components/atoms/SubmitButton.vue'
import Divider from '@/components/atoms/Divider.vue'
import { authStore } from '@/store'

type Data = {
  form: {
    usernameOrEmail: string
    password: string
  }
}
export default Vue.extend({
  components: {
    InputWithValidation,
    SubmitButton,
    Divider
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
    isEmail(text: string) {
      const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return reg.test(text)
    },
    async onSubmit() {
      const { usernameOrEmail, password } = this.form
      const [username, email] = this.isEmail(this.form.usernameOrEmail)
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
        this.notify({
          messages: ['ログインしました'],
          color: 'success'
        })
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
}
.input-container {
  padding-top: 25px;
}
.vs-col {
  margin-bottom: 20px;
  color: #777777;
  font-family: HiraginoSans-W5;
}
.col-google-btn {
  margin-top: -20px;
}
</style>
