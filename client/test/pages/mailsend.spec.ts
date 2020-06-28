import { mount, createLocalVue, config } from '@vue/test-utils'
import MailsendPage from '@/pages/auth/mailsend.vue'

config.showDeprecationWarnings = false
const localVue = createLocalVue()

describe('MailsendPage', () => {
  const wrapper = mount(MailsendPage, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
