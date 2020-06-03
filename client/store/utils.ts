import { BaseAPI } from '~/openapi/base'
import { Configuration } from '~/openapi'

export function buildApi<T extends BaseAPI>(Api: new (data: any) => T): T {
  const basePath =
    process.env.apiUrl ||
    `${window.location.protocol}//${window.location.hostname}`
  const config = new Configuration({
    basePath
  })
  return new Api(config)
}
