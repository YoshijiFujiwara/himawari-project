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
      },
      methods: {
        _getLabelColor(label: string) {
          switch (label) {
            case 'CHALLENGING': {
              return 'orange'
            }
            case 'ACHIEVEMENT': {
              return 'green'
            }
            case 'GIVEUP': {
              return 'grey'
            }
            default: {
              return 'grey'
            }
          }
        }
      }
    })
  }
}

Vue.use(Goal)
