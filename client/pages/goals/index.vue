<template>
  <div>
    <main>
      <vs-row>
        <vs-col><span class="">ダミーボタン</span> </vs-col>
        <vs-col
          ><vs-button
            color="danger"
            type="gradient"
            icon="add"
            @click="goalModel = true"
          ></vs-button
        ></vs-col>
      </vs-row>
      <vs-popup
        class-content="popup-example"
        title="学習を記録する"
        :active.sync="goalModel"
      >
        <div class="goal-model">
          <div class="goal-box">
            <p>目標<span class="required-color">*</span></p>
            <vs-select v-model="goal" label="" class="goal-select">
              <vs-select-item
                v-for="(item, index) in options1"
                :key="index"
                v-model="select2"
                size="large"
                :value="item.value"
                :text="item.text"
              />
            </vs-select>
          </div>

          <div class="learning-name-box">
            <p>学習名<span class="required-color">*</span></p>
            <vs-input
              v-model="learningName"
              size="large"
              class="learningName"
              placeholder=""
            />
          </div>

          <div class="learning-times-box">
            <p>学習時間<span class="required-color">*</span></p>

            <div class="input-times">
              <vs-input
                v-model="value2"
                size="large"
                type="number"
                class="input-time "
                placeholder=""
              />
              <span class="">時間</span>
              <vs-input
                v-model="value2"
                size="large"
                type="number"
                class="input-time"
                placeholder=""
              />
              <span class="">分</span>
            </div>
          </div>

          <div class="learning-content">
            <p>学習内容</p>
            <vs-textarea v-model="textarea" height="400px" />
          </div>

          <vs-divider />

          <vs-button color="primary" type="filled" @click="record = true"
            >学習を記録する</vs-button
          >
        </div>
      </vs-popup>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      select1: 4,
      options1: [
        { text: 'IT', value: 0 },
        { text: 'TOEIC', value: 2 },
        { text: 'その他', value: 3 },
        { text: 'Thor Ragnarok', value: 4 }
      ],
      learningName: '',
      value2: '',
      goalModel: false,
      record: false
    }
  }
})
</script>

<style lang="scss" scoped>
.vs-popup {
  width: 800px;
  // ↑適応されない

  .required-color {
    color: rgb(242, 19, 93);
  }

  .goal-model {
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
  .goal-select {
    width: 100%;
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
