import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuesax from 'vuesax'
import HelloWorld from '@/components/HelloWorld.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('HelloWorld', () => {
  const wrapper = mount(HelloWorld, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
