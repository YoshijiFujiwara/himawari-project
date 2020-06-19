<template>
  <vs-card>
    <!-- https://lusaxweb.github.io/vuesax/components/card.html#media -->
    <!-- を見ると、slot="media"で、カード内部のマージンがなくなるので使用している -->
    <div slot="media">
      <vs-table v-for="indexNum in 3" :key="indexNum" :data="commits">
        <template slot="header">
          <div class="table-header">
            <h3>
              yyyy年mm月dd日
            </h3>
          </div>
        </template>
        <template slot-scope="{ data }">
          <vs-tr v-for="(tr, indextr) in data" :key="indextr" :data="tr">
            <vs-td class="commit-td">
              <vs-row vs-type="flex" vs-justify="space-between">
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="2"
                >
                  <vs-icon icon="edit" color="primary"></vs-icon>
                  <vs-col
                    ><vs-row
                      ><span class="commit-name">{{ tr.name }}</span></vs-row
                    >
                    <vs-row>{{ tr.spendTime }}</vs-row></vs-col
                  >
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-w="2"
                >
                  <vs-button
                    type="flat"
                    color="warning"
                    icon="mood"
                  ></vs-button>
                  <vs-button
                    type="flat"
                    color="dark"
                    icon="delete_outline"
                  ></vs-button>
                </vs-col>
              </vs-row>
            </vs-td>
            <template slot="expand">
              <vs-row>
                <vs-col vs-offset="1" vs-type="flex">{{
                  tr.description
                }}</vs-col>
              </vs-row>
            </template>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type Commit = {
  name: string
  description: string
  spendTime: string
}
export default Vue.extend({
  props: {
    commits: Array as PropType<Commit[]>
  }
})
</script>

<style lang="scss" scoped>
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
</style>
