import { mount, createLocalVue, config, RouterLinkStub } from '@vue/test-utils'
import Vuesax from 'vuesax'
import SigninPage from '@/pages/users/signin.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('users/SigninPage', () => {
  const wrapper = mount(SigninPage, {
    localVue,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
