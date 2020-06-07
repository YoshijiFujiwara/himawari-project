import { mount, createLocalVue } from '@vue/test-utils'
import Vuesax from 'vuesax'
import Index from '@/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Vuesax as any)

describe('IndexPage', () => {
  const wrapper = mount(Index, { localVue })
  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('ナビゲーションバーがある', () => {
    expect(wrapper.find('.vs-navbar').isVueInstance()).toBeTruthy()
  })

  it('ナビゲーションバーに、プロジェクト名がある', () => {
    const navbar = wrapper.find('.vs-navbar')
    expect(navbar.find('.vs-navbar--title').text()).toBe('Project')
  })

  it('ナビゲーションバーにログインボタンとユーザー登録ボタンがある', () => {
    const navbar = wrapper.find('.vs-navbar')
    const navbarLinks = navbar.findAll('a')
    expect(navbarLinks.length).toBe(2)
    expect(navbarLinks.at(0).text()).toBe('ログイン')
    expect(navbarLinks.at(1).text()).toBe('登録する')
  })
})
