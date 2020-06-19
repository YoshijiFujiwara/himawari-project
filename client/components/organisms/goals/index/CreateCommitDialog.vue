<template>
  <vs-popup
    class-content="popup-example"
    title="学習を記録する"
    :active.sync="input"
  >
    <div class="goal-dialog">
      <validation-observer ref="observer" v-slot="{ invalid }" tag="form">
        <!-- いったん、表示中の目標詳細のIDを決め打ちでやるようにする -->
        <!-- <div class="goal-box">
          <SelectBowWithValidation
            v-model="form.goalId"
            label="目標"
            :select-items="selectItems"
            :is-big-label="true"
            :use-required-chip="true"
          />
        </div> -->
        <div class="learning-name-box">
          <InputWithValidation
            v-model="form.title"
            rules="required|max:20"
            label="学習名"
            :is-big-label="true"
            :use-required-chip="true"
          />
        </div>
        <div class="learning-times-box">
          <TimeInput v-model="form.studyTime" label="学習時間" />
        </div>
        <div class="learning-content">
          <TextArea
            v-model="form.description"
            label="学習内容"
            height="400px"
          />
        </div>
        <vs-divider />
        <vs-button
          :disabled="invalid"
          color="primary"
          type="filled"
          @click="onSubmit"
          >学習を記録する</vs-button
        >
      </validation-observer>
    </div>
  </vs-popup>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { goalStore } from '@/store'
import InputWithValidation from '@/components/molecules/InputWithValidation.vue'
import TimeInput from '@/components/atoms/TimeInput.vue'
import TextArea from '@/components/atoms/TextArea.vue'
// import SelectBowWithValidation from '@/components/molecules/SelectBoxWithValidation.vue'
import { CreateCommitDto } from '@/openapi'

export default Vue.extend({
  components: {
    TimeInput,
    InputWithValidation,
    TextArea
    // SelectBowWithValidation
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectItems: {
      type: Array as PropType<{ text: string; value: number }[]>,
      required: true
    }
  },
  data() {
    return {
      form: {
        goalId: (Number(this.$route.params.id) || -1) as number,
        title: '' as string,
        description: '' as string,
        studyTime: {
          hours: 0 as number,
          minutes: 0 as number
        }
      }
    }
  },
  computed: {
    input: {
      get(): boolean {
        return this.value
      },
      set(input: boolean) {
        this.$emit('input', input)
      }
    }
  },
  methods: {
    async onSubmit() {
      if (!this.form.goalId) return

      const createCommitDto: CreateCommitDto = {
        title: this.form.title,
        description: this.form.description || '',
        studyHours: Number(this.form.studyTime.hours),
        studyMinutes: Number(this.form.studyTime.minutes)
      }
      const { error, messages } = await goalStore.createCommit({
        goalId: this.form.goalId,
        createCommitDto
      })

      if (error && messages) {
        this.notify({
          messages,
          color: 'warning'
        })
      } else {
        this.input = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.vs-popup {
  p {
    padding-bottom: 5px;
    font-size: 20px;
  }
  .required-color {
    font-size: 10px;
    background-color: rgb(242, 19, 93);
    color: #ffffff;
    margin: 0 5px;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .goal-dialog {
    $space: 16px;
    padding: 0 $space;
    width: 100%;
    %box-base {
      margin-top: $space;
      margin-bottom: $space;
    }
    .goal-box {
      @extend %box-base;
    }

    .learning-name-box {
      @extend %box-base;
    }
    .learning-times-box {
      @extend %box-base;
      margin-top: $space;
    }

    .learning-content {
      @extend %box-base;
    }
  }

  .learningName {
    width: 100%;
  }

  .input-times {
    span {
      display: inline-block;
      margin: 0 0.5em;
    }
    .input-time {
      width: 80px;
      display: inline-block;
    }
  }
}
</style>
