import { isString } from 'remeda'

import { isObjectAnd } from '../guard/is-object-and'

export function getErrorMessage(error: unknown, defaultMessage?: string) {
  if (isString(error)) {
    return error
  }

  if (
    error instanceof Error ||
    isObjectAnd<Error>(error, (reason) => isString(reason.message))
  ) {
    return error.message
  }

  return defaultMessage ?? 'unknown error'
}
