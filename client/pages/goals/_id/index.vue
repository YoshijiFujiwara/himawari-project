<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <h1>ユーザ名｜TOEICで800点以上</h1>
        <p>
          目標作成ページの「目標について」の内容が表示されます。目標作成ページの「目標について」の内容が表示されます。<br />
          目標作成ページの「目標について」の内容が表示されます。目標作成ページの「目標について」の内容が表示されます。<br />
          目標作成ページの「目標について」の内容が表示されます。目標作成ページの「目標について」の内容が表示されます。<br />
        </p>
        <h2>学習記録</h2>
        <vs-card class="cardx" fixed-height>
          <div>
            <vs-list>
              <vs-list-item title="yyyy年mm月dd日"></vs-list-item>
              <vs-collapse accordion>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  1
                  <br /><br />
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  2
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  3
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  4
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  5
                </vs-collapse-item>
              </vs-collapse>
              <vs-list-item title="yyyy年mm月dd日"></vs-list-item>
              <vs-collapse accordion>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  1
                  <br /><br />
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  2
                </vs-collapse-item>
              </vs-collapse>
              <vs-list-item title="yyyy年mm月dd日"></vs-list-item>
              <vs-collapse accordion>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  1
                  <br /><br />
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  2
                </vs-collapse-item>
                <vs-collapse-item>
                  <div slot="header">
                    <p class="small-goal">小目標</p>
                    <span class="study-time">学習時間</span>
                  </div>
                  3
                </vs-collapse-item>
              </vs-collapse>
            </vs-list>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
<style>
.wrapper {
  height: 100%;
  width: 100%;
  background-color: #eff7ff;
}
.content {
  margin: auto;
  width: 66%;
}
.cardx {
  margin: auto;
}
.study-time {
  color: #2c2c2c;
  font-size: 12px;
}
.small-goal {
  font-size: 16px;
}
</style>
