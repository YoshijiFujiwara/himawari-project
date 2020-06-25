<template>
  <vs-card>
    <!-- https://lusaxweb.github.io/vuesax/components/card.html#media -->
    <!-- を見ると、slot="media"で、カード内部のマージンがなくなるので使用している -->
    <div v-for="(col, index) in 3" slot="media" :key="index">
      <vs-table :data="commits">
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
                <vs-col vs-offset="1" vs-type="flex">{{ tr.email }}</vs-col>
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

export default Vue.extend({
  data() {
    return {
      commits: [
        {
          id: 1,
          title: '目標を1つ作成しました!',
          username: 'Bret',
          icon: 'flag',
          email: 'Sincere@april.biz',
          website: 'hildegard.org'
        },
        {
          id: 2,
          title: '2つの目標に18回の学習を記録しました!',
          username: 'Antonette',
          icon: 'edit',
          email: 'Shanna@melissa.tv',
          website: 'anastasia.net'
        },
        {
          id: 3,
          title: '目標を1つ作成しました！',
          username: 'Samantha',
          icon: 'flag',
          email: 'Nathan@yesenia.net',
          website: 'ramiro.info'
        }
      ]
    }
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
