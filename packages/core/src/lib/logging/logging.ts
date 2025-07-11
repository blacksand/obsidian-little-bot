import { Effect, Logger as EffectLogger } from 'effect'

import { defaultLogger, getLogger } from './get-logger'

export class Logging extends Effect.Service<Logging>()(
  '@peaks/core/Logging',
  {
    dependencies: [EffectLogger.pretty],
    succeed: { getLogger, ...defaultLogger },
  },
) {}
