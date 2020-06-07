import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuesax from 'vuesax'
import SigninPage from '@/pages/users/signin.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('users/SigninPage', () => {
  const wrapper = mount(SigninPage, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
