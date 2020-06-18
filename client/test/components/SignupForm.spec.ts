import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuesax from 'vuesax'
import SignupForm from '@/components/organisms/auth/signup/SignupForm.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('SignupForm', () => {
  const wrapper = mount(SignupForm, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // TODO: バリデーションを追加中なので、落ち着いてから
})
