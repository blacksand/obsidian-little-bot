import { Data } from 'effect'

export class Uninitialized extends Data.TaggedError('Uninitialized')<{
  message: string
}> {
  constructor(name: string) {
    super({ message: `${name} is not initialized.` })
  }
}
