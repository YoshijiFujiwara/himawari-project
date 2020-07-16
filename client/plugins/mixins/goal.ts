import Vue from 'vue'
import { GoalSerializer } from '~/openapi'
import { goalStore } from '~/store'

const Goal = {
  install(Vue: any, _: any) {
    Vue.mixin({
      computed: {
        _goal(): GoalSerializer | null {
          return goalStore.goalGetter
        }
      }
    })
  }
}

Vue.use(Goal)
