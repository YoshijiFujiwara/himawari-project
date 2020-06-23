<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <UserInfo />
      </vs-col>
      <vs-row vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <GoalList />
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <CommitsSummary />
        </vs-col>
        <CommitsTable />
      </vs-row>
    </vs-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CommitsSummary from '@/components/organisms/profile/CommitsSummary.vue'
import CommitsTable from '@/components/organisms/profile/CommitsTable.vue'
import GoalList from '@/components/organisms/profile/GoalList.vue'
import UserInfo from '@/components/organisms/profile/UserInfo.vue'

export default Vue.extend({
  middleware: 'authenticated',
  components: {
    CommitsSummary,
    CommitsTable,
    GoalList,
    UserInfo
  }
})
</script>
<style lang="scss" scoped></style>
