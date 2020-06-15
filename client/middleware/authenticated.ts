import { Middleware, Context } from '@nuxt/types'
import { authStore } from '~/store'

const authenticatedMiddleware: Middleware = ({ redirect }: Context) => {
  if (authStore.isNOTLoggedIn) {
    return redirect('/users/signin')
  }
}

export default authenticatedMiddleware
