<template>
  <div>
    <v-card
      v-for="(commit, i) in commitsPerPage"
      :key="i"
      class="pa-0 mainText--text rounded-0"
    >
      <v-card-title v-if="i in dateLabels" class="commitTableHeaderBg pb-0">
        <p>{{ dateLabels[i] }}{{ deleteCommitId }}</p>
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
                <v-btn v-if="Iam.id != goal.userId" icon color="satisfyIcon">
                  <v-icon>mdi-emoticon-outline</v-icon>
                </v-btn>
                <v-btn icon @click="openDeleteModal(commit.id)">
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
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">
            学習記録を削除する
          </v-card-title>

          <v-card-text>
            この学習記録を本当に削除しますか？削除後は元に戻すことはできません。
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              キャンセル
            </v-btn>

            <v-btn color="error" text @click="deleteCommit">
              削除する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <div v-if="paginationLength" class="text-center mt-5">
      <v-pagination
        v-model="page"
        :length="paginationLength"
        circle
      ></v-pagination>
    </div>
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <CreateCommitDialog
        :close-dialog="
          () => {
            this.$emit('close')
          }
        "
        :init-display-condition="initDisplayCondition"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { CommitSerializer, GoalSerializer } from '@/openapi'
import CreateCommitDialog from '@/components/organisms/goals/index/CreateCommitDialog.vue'

export default Vue.extend({
  components: {
    CreateCommitDialog
  },
  props: {
    commits: {
      type: Array as PropType<CommitSerializer[]>,
      required: true
    },
    createCommitDialog: {
      type: Boolean,
      required: true
    },
    goal: {
      type: Object as PropType<GoalSerializer>,
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
      dialog: false,
      deleteCommitId: null
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
    },
    isDialogOpen: {
      get() {
        return this.createCommitDialog
      },
      set(isOpen) {
        return isOpen
      }
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
    initDisplayCondition() {
      this.page = 1
    },
    deleteCommit() {
      alert('hogehoge')
    },
    openDeleteModal(commitId) {
      this.dialog = true
      this.deleteCommitId = commitId
    }
  }
})
</script>
