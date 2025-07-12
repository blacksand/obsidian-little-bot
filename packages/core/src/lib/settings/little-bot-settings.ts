import { Effect, Ref } from 'effect'

import type { Undefinable } from '@peaks/utils'

import { Uninitialized } from '../errors/uninitialized'
import { sanitizeSettings } from './sanitized-settings'
import type { SanitizedSettings } from './sanitized-settings'

export class LittleBotSettings extends Effect.Service<LittleBotSettings>()(
  '@peaks/core/LittleBotSettings',
  {
    effect: Effect.gen(function* () {
      const settingsRef = yield* Ref.make<Undefinable<SanitizedSettings>>(undefined)

      const getAll = () => settingsRef.pipe(
        Effect.flatMap((settings) =>
          settings == null
            ? Effect.fail(new Uninitialized('LittleBotSettings'))
            : Effect.succeed(settings)),
      )

      const getSetting = (key: keyof SanitizedSettings) => settingsRef.pipe(
        Effect.flatMap((settings) =>
          settings == null
            ? Effect.fail(new Uninitialized('LittleBotSettings'))
            : Effect.succeed(settings[key]),
        ),
      )

      const load = (data: unknown) => sanitizeSettings(data).pipe(
        Effect.tap((settings) => Ref.update(settingsRef, () => settings)),
      )

      // for unit test
      const unload = () => Ref.update(settingsRef, () => undefined)

      return { getAll, getSetting, load, unload }
    }),
  },
) {}
