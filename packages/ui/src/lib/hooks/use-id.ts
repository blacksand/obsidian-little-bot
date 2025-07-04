import { useState } from 'react'

let seed = 0

export function useId() {
  // eslint-disable-next-line react-naming-convention/use-state
  const [id, _] = useState(`id-${++seed}`)
  return id
}
