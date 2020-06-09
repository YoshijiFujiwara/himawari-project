import { BaseAPI } from '~/openapi/base'
import { Configuration } from '~/openapi'

export const buildApiUrl = (): string => {
  let basePath
  if (process.env.notSkaffold && process.env.apiUrl) {
    basePath = process.env.apiUrl
  } else {
    basePath = `${window.location.protocol}//${window.location.hostname}`
  }
  return basePath
}

export function buildApi<T extends BaseAPI>(Api: new (data: any) => T): T {
  const basePath = buildApiUrl()
  const config = new Configuration({
    basePath
  })
  return new Api(config)
}

type Error = {
  response: {
    data: {
      message: {
        map: (
          arg0: (m: {
            constraints: ArrayLike<unknown> | { [s: string]: unknown }
          }) => unknown
        ) => string[]
      }
    }
  }
}
export const extractErrorMessages = (err: Error): string[] => {
  return err.response.data.message.map(
    (m: { constraints: { [s: string]: unknown } | ArrayLike<unknown> }) => {
      return Object.values(m.constraints)[0]
    }
  )
}
