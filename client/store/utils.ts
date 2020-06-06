import { BaseAPI } from '~/openapi/base'
import { Configuration } from '~/openapi'

export function buildApi<T extends BaseAPI>(Api: new (data: any) => T): T {
  let basePath
  if (process.env.notSkaffold && process.env.apiUrl) {
    basePath = process.env.apiUrl
  } else {
    basePath = `${window.location.protocol}//${window.location.hostname}`
  }

  const config = new Configuration({
    basePath
  })
  return new Api(config)
}
