<template>
  <vs-card>
    <!-- https://lusaxweb.github.io/vuesax/components/card.html#media -->
    <!-- を見ると、slot="media"で、カード内部のマージンがなくなるので使用している -->
    <div v-for="(col, index) in 1" slot="media" :key="index">
      <vs-table :data="commits">
        <template slot="header">
          <div class="table-header">
            <h3>
              yyyy年mm月dd日
            </h3>
          </div>
        </template>
        <template>
          <vs-tr v-for="(tr, indextr) in commits" :key="indextr" :data="tr">
            <vs-td class="commit-td">
              <vs-row vs-type="flex" vs-justify="space-between">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="3"
                >
                  <vs-icon :icon="tr.icon" color="primary"></vs-icon>
                  <vs-col
                    ><vs-row
                      ><span class="commit-name">{{ tr.title }}</span></vs-row
                    >
                  </vs-col>
                </vs-col>
              </vs-row>
            </vs-td>
            <template slot="expand">
              <vs-row>
                <!-- v-forとかでここにvs-col追加していってもデザインが崩れないこと確認 -->
                <vs-col
                  v-for="(col, index) in 1"
                  :key="index"
                  vs-offset="1"
                  vs-type="flex"
                >
                  <span class="align">{{ tr.description }}</span>
                  <img v-if="tr.img" src="~/assets/wateringcan.png"
                /></vs-col>
              </vs-row>
            </template>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { goalStore } from '@/store'
import { CommitSerializer } from '@/openapi'

export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    commits(): CommitSerializer[] {
      return goalStore.commitsGetter
    }
  }
})
</script>

<style lang="scss" scoped>
span.align {
  padding-top: 4px;
}
.table-header {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}
.table-action-buttons {
  display: flex;
  justify-content: flex-end;
}
.commit-td {
  width: 97%;
}
.commit-name {
  font-weight: bold;
}
.commit-description {
  display: flex;
  justify-content: flex-start;
}
img {
  max-width: 35px;
  max-height: 40px;
  margin-left: 1rem;
}
</style>
