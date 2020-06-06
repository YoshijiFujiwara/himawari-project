import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { getModule } from 'vuex-module-decorators'
import { TaskStore } from '@/store/modules/task'

const localVue = createLocalVue()
localVue.use(Vuex)

/**
 * 新しいstoreインスタンスを返却するfactory関数
 */
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      task: TaskStore
    }
  })
  store.replaceState({
    tasks: []
  })
  return getModule(TaskStore, store)
}

describe('TaskStore', () => {
  let mockAxiosGetResult: {
    data: { id: number; title: string; description: string; status: string }[]
  }
  let mockAxiosPostResult: {
    data: { id: number; title: string; description: string; status: string }
  }
  jest.mock('taskApi', () => ({
    tasksControllerGetTasks: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
    tasksControllerCreateTask: jest.fn(() =>
      Promise.resolve(mockAxiosPostResult)
    )
  }))

  it('has to get a store instance', (done) => {
    const service = factory()
    expect(service).toBeInstanceOf(Object)
    done()
  })

  it('SET_TASKS', () => {
    const service = factory()
    const tasks = [
      { id: 1, title: 'hoge', description: 'fuga', status: 'OPEN' },
      { id: 2, title: 'hoge', description: 'fuga', status: 'OPEN' }
    ]
    expect(service.tasks.length).toBe(0)
    service.SET_TASKS(tasks)
    expect(service.tasks.length).toBe(2)
  })

  it('getTasks', async () => {
    mockAxiosGetResult = {
      data: [
        { id: 1, title: 'hoge', description: 'fuga', status: 'OPEN' },
        { id: 2, title: 'hoge', description: 'fuga', status: 'OPEN' }
      ]
    }

    const service = factory()
    // expect(service.tasks.length).toBe(0)
    await service.getTasks()
    expect(service.tasks.length).toBe(2)
  })

  // beforeEach(() => {
  //   // stateの初期化
  //   taskStore.tasks = []

  //   // [FIY] $axiosテストは https://github.com/nuxt-community/axios-module/issues/105 を参考
  //   jest.mock('axios', () => ({
  //     $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
  //     $post: jest.fn(() => Promise.resolve(mockAxiosPostResult))
  //   }))
  // })

  // describe('mutations', () => {
  //   test('SET_TASKS ミューテーションがコミットされると、tasksが上書きされる', () => {
  //     expect(taskStore.tasks.length).toBe(0)
  // taskStore.SET_TASKS([
  //   { id: 1, title: 'hoge', description: 'fuga', status: 'OPEN' },
  //   { id: 2, title: 'hoge', description: 'fuga', status: 'OPEN' }
  // ])
  //     expect(taskStore.tasks.length).toBe(2)
  //   })
  // })

  // describe('actions', () => {
  //   test('getTasksアクションが実行されると、', () => {
  //     expect(taskStore.tasks.length).toBe(0)
  //     mockAxiosGetResult = {
  //       data: [
  //         { id: 1, title: 'hoge', description: 'fuga', status: 'OPEN' },
  //         { id: 2, title: 'hoge', description: 'fuga', status: 'OPEN' }
  //       ]
  //     }
  //     expect(taskStore.tasks.length).toBe(2)
  //   })
  // })
})
