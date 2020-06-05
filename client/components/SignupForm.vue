<template>
  <vs-row vs-align="center" vs-w="8">
    <h2 class="form-title">Projectに登録</h2>
    <div class="input-container">
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
        <vs-button color="primary" type="filled"
          >アカウントを作成する
        </vs-button>
      </vs-col>
    </div>
  </vs-row>
</template>

<script lang="ts">
import Vue from 'vue'

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
</style>
