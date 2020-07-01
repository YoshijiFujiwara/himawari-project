import { Middleware, Context } from '@nuxt/types'
import { authStore } from '~/store'

const authenticatedMiddleware: Middleware = async ({ redirect }: Context) => {
  if (authStore.isNOTLoggedIn) {
    const { error } = await authStore.getMe()
    if (error) {
      return redirect('/auth/signin')
    }
  }
}

export default authenticatedMiddleware
