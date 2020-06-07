import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuesax from 'vuesax'
import ProfilePage from '@/pages/profile.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('ProfilePage', () => {
  const wrapper = mount(ProfilePage, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
