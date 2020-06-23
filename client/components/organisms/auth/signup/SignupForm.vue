<template>
  <vs-col vs-type="flex" vs-justify="center" vs-lg="12" vs-sm="12" vs-xs="12">
    <vs-row vs-align="center" vs-w="8" vs-lg="8" vs-sm="8" vs-xs="10">
      <h2 class="form-title">Projectに登録</h2>
      <div class="input-container">
        <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
          <vs-col>
            <InputWithValidation
              v-model="form.username"
              rules="required|min:5|max:20"
              label="ユーザー名"
            />
          </vs-col>
          <vs-col>
            <InputWithValidation
              v-model="form.email"
              rules="required|email"
              label="メールアドレス"
            />
          </vs-col>
          <vs-col>
            <InputWithValidation
              v-model="form.password"
              rules="required|min:6|max:20"
              type="password"
              label="パスワード"
            />
          </vs-col>
          <CheckboxWithValidation
            v-model="form.isAgreed"
            name="同意"
            text="利用規約に同意します"
          />
          <vs-col vs-type="flex" vs-justify="start" vs-w="12">
            <SubmitButton
              text="アカウントを作成"
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
          <SubmitButton
            text="Googleアカウントでログイン"
            color="#db4e45"
            :on-click="onClickGoogleButton"
          />
        </vs-col>
      </div>
    </vs-row>
  </vs-col>
</template>

<script lang="ts">
import Vue from 'vue'
import InputWithValidation from '@/components/molecules/InputWithValidation.vue'
import CheckboxWithValidation from '@/components/molecules/CheckboxWithValidation.vue'
import SubmitButton from '@/components/atoms/SubmitButton.vue'
import Divider from '@/components/atoms/Divider.vue'
import { authStore } from '@/store'
import { buildApiUrl } from '@/store/utils'

export default Vue.extend({
  components: {
    InputWithValidation,
    CheckboxWithValidation,
    SubmitButton,
    Divider
  },
  data() {
    return {
      form: {
        username: '' as string,
        email: '' as string,
        password: '' as string,
        isAgreed: undefined as string | undefined
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$vs.loading()
      const { error, messages } = await authStore.signup(this.form)
      this.$vs.loading.close()

      if (!error) {
        this.$router.push('/auth/mailsend')
      } else if (error && messages) {
        this.notify({
          messages,
          color: 'warning'
        })
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
