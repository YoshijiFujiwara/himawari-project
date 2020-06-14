import { Middleware, Context } from '@nuxt/types'
import { authStore } from '~/store'

const guestMiddleware: Middleware = ({ redirect }: Context) => {
  if (authStore.isLoggedIn) {
    return redirect('/profile')
  }
}

export default guestMiddleware
