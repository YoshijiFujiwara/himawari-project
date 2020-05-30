import { BaseAPI } from '~/openapi/base'
import { Configuration } from '~/openapi'

export function buildApi<T extends BaseAPI>(Api: new (data: any) => T): T {
  const config = new Configuration({
    basePath: `${window.location.protocol}//${window.location.hostname}`
  })
  return new Api(config)
}
