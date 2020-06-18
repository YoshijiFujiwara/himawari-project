<template>
  <div>
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6.6">
        <vs-card class="card">
          <div slot="header">
            <CardHeader />
            <vs-row class="divider">
              <vs-col vs-offset="0.5" vs-w="11">
                <vs-divider></vs-divider>
              </vs-col>
            </vs-row>
            <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
              <vs-row class="goal">
                <vs-col vs-w="5" vs-offset="0.7">
                  <InputWithValidation
                    v-model="form.title"
                    rules="required|max:20"
                    label="目標"
                    :is-big-label="true"
                    :use-required-chip="true"
                  />
                </vs-col>
              </vs-row>
              <vs-row class="description">
                <vs-col vs-w="8" vs-offset="0.7">
                  <TextArea v-model="form.description" label="目標について" />
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col vs-offset="0.5" vs-w="11">
                  <vs-divider></vs-divider>
                </vs-col>
              </vs-row>
              <PublicRadios v-model="form.isPublic" />
              <vs-row>
                <vs-col vs-offset="0.5" vs-w="11">
                  <vs-divider></vs-divider>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col vs-type="flex" vs-w="3" vs-offset="0.7">
                  <SubmitButton
                    text="目標を作成する"
                    color="primary"
                    :disabled="invalid"
                    :on-click="onSubmit"
                  />
                </vs-col>
              </vs-row>
            </validation-observer>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import SubmitButton from '@/components/atoms/SubmitButton.vue'
import CardHeader from '@/components/organisms/goals/new/CardHeader.vue'
import PublicRadios from '@/components/organisms/goals/new/PublicRadios.vue'
import InputWithValidation from '@/components/molecules/InputWithValidation.vue'
import TextArea from '@/components/atoms/TextArea.vue'
import { CreateGoalDto } from '@/openapi'

type Data = {
  form: CreateGoalDto
}
export default Vue.extend({
  middleware: 'authenticated',
  components: {
    InputWithValidation,
    TextArea,
    CardHeader,
    PublicRadios,
    SubmitButton
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        isPublic: false
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$vs.loading()
      const { res, error, messages } = await goalStore.addGoal(this.form)
      this.$vs.loading.close()

      if (!error) {
        this.$router.push(`/goals/${res.data.id}`)
      } else if (error && messages) {
        this.notify({
          messages,
          color: 'warning'
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  padding-top: 10px;
  padding-bottom: 20px;
}
.divider {
  margin-top: -10px;
  margin-bottom: 10px;
}
h1 {
  font-size: 36px;
}
.description {
  margin-top: 30px;
}
</style>
