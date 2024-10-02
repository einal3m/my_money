import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

type ErrorPayload = {
  data: Payload
}
type Payload = {
  status: number
  error: string
}

/**
 * Log a warning when we get errors
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload) {
        const errorPayload: ErrorPayload = action.payload as ErrorPayload
        console.log(
          `Api Error: (${errorPayload.data?.status}) ${errorPayload.data?.error}`,
        )
        // api.dispatch()
      } else {
        console.log(action.error)
      }
    }

    return next(action)
  }
