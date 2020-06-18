<template>
  <div>
    <CreateGoalsForm :handle-submit="onSubmit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateGoalsForm from '@/components/pages/goals/CreateGoalsForm.vue'
import { goalStore } from '@/store'
import { CreateGoalDto } from '@/openapi'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CreateGoalsForm
  },
  data() {
    return {}
  },
  methods: {
    async onSubmit(form: CreateGoalDto) {
      console.log(form)
      this.$vs.loading()
      const { res, error, messages } = await goalStore.addGoal(form)
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

<style lang="scss" scoped></style>
