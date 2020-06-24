<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="9">
        <vs-card class="card">
          <div slot="header">
            <CardHeader />
            <vs-row class="divider">
              <vs-col vs-offset="0.5" vs-w="5">
                <vs-row class="group-msg">
                  <vs-col>
                    <p>
                      Projectは、グループを作成し、シェアすることでお互いを応援し
                      合うことができ、最大の効果を発揮できます。
                    </p>
                  </vs-col>
                </vs-row>
                <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                  tag="form"
                >
                  <vs-row class="group-input">
                    <vs-col vs-w="12">
                      <InputWithValidation
                        v-model="form.name"
                        rules="max:20"
                        label="グループ名"
                        :is-big-label="true"
                        :use-required-chip="true"
                      />
                    </vs-col>
                  </vs-row>
                  <vs-row class="group-input">
                    <vs-col>
                      <InputWithValidation
                        v-model="form.member"
                        rules="required"
                        label="グループメンバー"
                        :is-big-label="true"
                        :use-required-chip="false"
                      />
                    </vs-col>
                  </vs-row>
                  <vs-row vs-justify="center" class="group-submit">
                    <vs-col vs-type="flex" vs-w="12" vs-offset="">
                      <SubmitButton
                        text="グループ作成"
                        color="primary"
                        :disabled="invalid"
                        :on-click="onSubmit"
                      />
                    </vs-col>
                  </vs-row>
                  <vs-row class="group-later">
                    <vs-col vs-justify="center" vs-type="flex" vs-w="12">
                      <p>
                        <a href="#">後で行う </a>
                      </p>
                    </vs-col>
                  </vs-row>
                </validation-observer>
              </vs-col>
              <vs-col vs-offset="0.5" vs-w="5">
                <img src="~/assets/group_img.png" class="group-img" alt="" />
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
import CardHeader from '@/components/organisms/groups/new/CardHeader.vue'
import InputWithValidation from '@/components/molecules/InputWithValidation.vue'
import SubmitButton from '@/components/atoms/SubmitButton.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CardHeader,
    InputWithValidation,
    SubmitButton
  },
  data() {
    return {
      form: {
        name: '',
        member: ''
      }
    }
  },
  methods: {
    onSubmit() {}
  }
})
</script>

<style lang="scss" scoped>
.card {
  padding-top: 10px;
  padding-bottom: 20px;
}
.divider {
  margin-top: 20px;
  margin-bottom: 10px;
}
h1 {
  font-size: 36px;
}
.description {
  margin-top: 30px;
}

.group-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.group-input {
  margin-top: 30px;
  width: 100%;
}

.group-later {
  margin-top: 30px;
  font-size: 16px;
  line-height: 1.13;
  a {
    color: #919191;
  }
}
</style>
