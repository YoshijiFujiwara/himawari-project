import { mount, createLocalVue, config } from '@vue/test-utils'
import HelloWorld from '@/components/atoms/HelloWorld.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()

describe('HelloWorld', () => {
  const dummyMessage = 'HelloWorldSuper!!!'
  const wrapper = mount(HelloWorld, {
    localVue,
    propsData: {
      msg: dummyMessage
    }
  })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('h1タグがpropsのmsgを適切に反映していること', () => {
    expect(wrapper.find('h1').text()).toBe(dummyMessage)
  })
})
