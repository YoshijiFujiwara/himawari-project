import { Middleware, Context } from '@nuxt/types'
import { authStore } from '~/store'

const guestMiddleware: Middleware = async ({ redirect }: Context) => {
  if (authStore.isLoggedIn) {
    return redirect('/profile')
  }

  const token = localStorage.getItem('token')
  if (token && authStore.isNOTLoggedIn) {
    const { error } = await authStore.getMe()
    if (!error) {
      return redirect('/profile')
    }
  }
}

export default guestMiddleware
