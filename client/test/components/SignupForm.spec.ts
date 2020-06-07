import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuesax from 'vuesax'
import SignupForm from '@/components/SignupForm.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('SignupForm', () => {
  const wrapper = mount(SignupForm, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
