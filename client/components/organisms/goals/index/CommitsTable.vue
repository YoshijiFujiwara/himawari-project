<template>
  <div>
    <v-card
      v-for="(commit, i) in commitsPerPage"
      :key="i"
      class="pa-0 mainText--text rounded-0"
    >
      <v-card-title v-if="i in dateLabels" class="commitTableHeaderBg pb-0">
        <p>{{ dateLabels[i] }}</p>
      </v-card-title>
      <v-expansion-panels accordion multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div class="d-flex justify-space-between mainText--text">
              <div class="d-flex align-self-center">
                <v-icon color="primary" class="mr-3">mdi-pencil</v-icon>
                <div class="d-flex flex-column">
                  <p class="font-weight-bold text-subtitle-1 ma-0">
                    {{ commit.title }}
                  </p>
                  <p>
                    {{ `${commit.studyHours}時間${commit.studyMinutes}分` }}
                  </p>
                  <div>
                    <v-chip small>
                      <v-icon>mdi-emoticon-happy-outline</v-icon>
                    </v-chip>
                    <v-chip small>
                      <v-icon>mdi-emoticon-kiss-outline</v-icon>
                    </v-chip>
                  </div>
                </div>
              </div>
              <div class="d-flex align-self-center">
                <v-btn v-if="!isMyGoal" icon color="satisfyIcon">
                  <v-icon>mdi-emoticon-outline</v-icon>
                </v-btn>
                <v-btn v-if="isMyGoal" icon @click="openDeleteModal(commit)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mainText--text">
            {{ commit.description }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <div v-if="paginationLength" class="text-center mt-5">
      <v-pagination
        v-model="page"
        :length="paginationLength"
        circle
      ></v-pagination>
    </div>
    <DeleteCommitDialog
      v-if="deleteCommit"
      v-model="deleteCommitDialogOpen"
      :commit="deleteCommit"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { CommitSerializer, GoalSerializer } from '@/openapi'
import DeleteCommitDialog from '@/components/organisms/goals/index/DeleteCommitDialog.vue'

export default Vue.extend({
  components: {
    DeleteCommitDialog
  },
  props: {
    commits: {
      type: Array as PropType<CommitSerializer[]>,
      required: true
    },
    goal: {
      type: Object as PropType<GoalSerializer>,
      required: true
    },
    isMyGoal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dateFns: {
        format
      },
      page: 1,
      pageSize: 10,
      deleteCommitDialogOpen: false,
      deleteCommit: null as CommitSerializer | null
    }
  },
  computed: {
    commitsPerPage(): CommitSerializer[] {
      return this.paginate(this.commits, this.pageSize, this.page)
    },
    dateLabels(): { [key: number]: string } {
      return this.commitsPerPage.reduce(
        (acc: { [key: number]: string }, commit, index) => {
          const dateStr = format(new Date(commit.createdAt), 'yyyy年MM月dd日')
          const found = Object.values(acc).find((d) => d === dateStr)
          if (!found) {
            acc[index] = dateStr
          }
          return acc
        },
        {}
      )
    },
    paginationLength(): number {
      return Math.ceil(this.commits.length / this.pageSize)
    }
  },
  watch: {
    createCommitDialog(newVal) {
      if (!newVal) {
        this.$emit('close')
      }
    }
  },
  methods: {
    paginate(
      array: Array<any>,
      pageSize: number,
      pageNumber: number
    ): Array<any> {
      return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    },
    openDeleteModal(commit: CommitSerializer) {
      this.deleteCommitDialogOpen = true
      this.deleteCommit = commit
    },
    initDisplayCondition() {
      this.page = 1
    }
  }
})
</script>
