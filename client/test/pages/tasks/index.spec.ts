import { mount, createLocalVue, config, RouterLinkStub } from '@vue/test-utils'
import Vuesax from 'vuesax'
import Index from '@/pages/tasks/index.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('tasks/IndexPage', () => {
  const wrapper = mount(Index, {
    localVue,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('フォームがある', () => {
    expect(wrapper.find('form').exists()).toBeTruthy()
  })

  it('フォームにvs-inputが２つある', () => {
    const form = wrapper.find('form')
    const vsInputs = form.findAll('.vs-input')
    expect(vsInputs.length).toBe(2)
  })

  it('フォームに送信ボタンがある', () => {
    const form = wrapper.find('form')
    const submitButton = form.find('.vs-button')
    expect(submitButton.isVueInstance).toBeTruthy()
  })
})
