<template>
  <vs-card>
    <!-- https://lusaxweb.github.io/vuesax/components/card.html#media -->
    <!-- を見ると、slot="media"で、カード内部のマージンがなくなるので使用している -->
    <div slot="media">
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
                  vs-w="2"
                >
                  <vs-icon icon="edit" color="primary"></vs-icon>
                  <vs-col
                    ><vs-row
                      ><span class="commit-name">{{ tr.name }}</span></vs-row
                    >
                    <vs-row>{{ `${tr.id}時間${tr.id}分` }}</vs-row></vs-col
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
      goals: [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          website: 'hildegard.org'
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          website: 'anastasia.net'
        },
        {
          id: 3,
          name: 'Clementine Bauch',
          username: 'Samantha',
          email: 'Nathan@yesenia.net',
          website: 'ramiro.info'
        },
        {
          id: 4,
          name: 'Patricia Lebsack',
          username: 'Karianne',
          email: 'Julianne.OConner@kory.org',
          website: 'kale.biz'
        },
        {
          id: 5,
          name: 'Chelsey Dietrich',
          username: 'Kamren',
          email: 'Lucio_Hettinger@annie.ca',
          website: 'demarco.info'
        },
        {
          id: 6,
          name: 'Mrs. Dennis Schulist',
          username: 'Leopoldo_Corkery',
          email: 'Karley_Dach@jasper.info',
          website: 'ola.org'
        },
        {
          id: 7,
          name: 'Kurtis Weissnat',
          username: 'Elwyn.Skiles',
          email: 'Telly.Hoeger@billy.biz',
          website: 'elvis.io'
        },
        {
          id: 8,
          name: 'Nicholas Runolfsdottir V',
          username: 'Maxime_Nienow',
          email: 'Sherwood@rosamond.me',
          website: 'jacynthe.com'
        },
        {
          id: 9,
          name: 'Glenna Reichert',
          username: 'Delphine',
          email: 'Chaim_McDermott@dana.io',
          website: 'conrad.com'
        },
        {
          id: 10,
          name: 'Clementina DuBuque',
          username: 'Moriah.Stanton',
          email: 'Rey.Padberg@karina.biz',
          website: 'ambrose.net'
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
