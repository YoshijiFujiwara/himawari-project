import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuesax from 'vuesax'
import SignupPage from '@/pages/users/signup.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('SignupPage', () => {
  const wrapper = mount(SignupPage, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
