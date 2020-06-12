import { Middleware, Context } from '@nuxt/types'
import { getModule } from 'vuex-module-decorators'
import { AuthModule } from '~/store/modules/auth'

const authenticatedMiddleware: Middleware = ({ redirect, store }: Context) => {
  const authStore = getModule(AuthModule, store)
  if (!authStore.user) {
    return redirect('/users/signin')
  }
}

export default authenticatedMiddleware
