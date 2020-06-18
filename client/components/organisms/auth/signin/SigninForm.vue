<template>
  <vs-col vs-type="flex" vs-justify="center" vs-lg="12" vs-sm="12" vs-xs="12">
    <vs-row vs-align="center" vs-w="8">
      <h2 class="form-title">Projectにログイン</h2>
      <div class="input-container">
        <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
          <InputWithValidation
            v-model="form.usernameOrEmail"
            rules="required"
            label="ユーザー名またはメールアドレス"
          />
          <InputWithValidation
            v-model="form.password"
            rules="required"
            type="password"
            label="パスワード"
          />
          <vs-col>
            <p class="p-forget-pass">
              パスワードをお忘れの方はこちら
            </p>
          </vs-col>
          <SubmitButton
            text="ログイン"
            color="primary"
            :disabled="invalid"
            :on-click="onSubmit"
          />
        </validation-observer>
        <Divider text="または" />
        <SubmitButton
          text="Googleアカウントでログイン"
          color="danger"
          :on-click="onClickGoogleButton"
        />
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
  color: #707070;
}
.input-container {
  padding-top: 25px;
}
</style>
