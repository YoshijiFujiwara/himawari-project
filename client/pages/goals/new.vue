<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6.6">
        <vs-card class="cardx">
          <div slot="header">
            <vs-row vs-justify="flex-start">
              <vs-col vs-offset="0.5" vs-type="flex">
                <vs-icon
                  icon="flag"
                  class="main"
                  color="#54a9fe"
                  size="medium"
                ></vs-icon>
                <h1>
                  新しい目標を作成する
                </h1>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col vs-offset="0.5" vs-w="11">
                <vs-divider></vs-divider>
              </vs-col>
            </vs-row>
            <vs-row class="goal">
              <vs-col vs-w="5" vs-offset="0.7">
                <h3>目標<span class="required">*</span></h3>
                <vs-input v-model="goal.title" />
              </vs-col>
            </vs-row>
            <vs-row class="description">
              <vs-col vs-w="8" vs-offset="0.7">
                <h3>目標について</h3>
                <vs-textarea v-model="goal.description" />
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col vs-offset="0.5" vs-w="11">
                <vs-divider></vs-divider>
              </vs-col>
            </vs-row>
            <vs-row class="public">
              <vs-col vs-w="10" vs-offset="0.8">
                <vs-radio
                  v-model="goal.isPublic"
                  vs-name="radios1"
                  vs-value="true"
                >
                  <vs-col vs-type="flex" vs-offset="0.2">
                    <vs-icon
                      icon="import_contacts"
                      color="#606060"
                      size="large"
                    ></vs-icon>
                    <vs-col vs-w="10" vs-offset="0.3">
                      <h3>公開</h3>
                      <p>
                        誰でもこの目標を見ることができます。目標を公開にして、みんなと応援し合いましょう！
                      </p>
                    </vs-col>
                  </vs-col>
                </vs-radio>
              </vs-col>
            </vs-row>
            <vs-row class="public">
              <vs-col vs-w="10" vs-offset="0.4">
                <vs-radio
                  v-model="goal.isPublic"
                  vs-name="radios1"
                  vs-value="false"
                  checked="true"
                >
                  <vs-row>
                    <vs-col vs-type="flex" vs-offset="0.2">
                      <vs-icon
                        icon="https"
                        color="#606060"
                        size="large"
                      ></vs-icon>
                      <vs-col vs-w="10" vs-offset="0.3">
                        <h3>非公開</h3>
                        <p>
                          この目標はあなたもしくは、グループメンバーしか見ることができません。
                        </p>
                      </vs-col>
                    </vs-col>
                  </vs-row>
                </vs-radio>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col vs-offset="0.5" vs-w="11">
                <vs-divider></vs-divider>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col vs-type="flex" vs-w="4" vs-offset="1">
                <vs-button color="#54a9fe" type="filled" @click="onSubmit"
                  >目標を作成する
                </vs-button>
              </vs-col>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  goal: {
    title: string // 目標の名前
    description: string // 目標の詳細
    isPublic: boolean // 公開設定
  }
}

export default Vue.extend({
  data() {
    return {
      goal: {
        title: '',
        description: '',
        isPublic: false
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.goal)
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  color: #707070;
  font-size: 36px;
}
.description {
  margin-top: 30px;
}
.vs-input {
  width: 100%;
}
.required {
  color: #d00505;
}
.vs-icon {
  padding-top: 10px;
}
.public,
.goal,
.description {
  h3 {
    color: #707070;
    font-size: 20px;
  }
  p {
    color: #999999;
    font-size: 16px;
  }
}
</style>
