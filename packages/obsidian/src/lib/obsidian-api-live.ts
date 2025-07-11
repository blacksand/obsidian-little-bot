/* eslint-disable unicorn/consistent-function-scoping */
import { Effect, Either, Layer } from 'effect'
import * as obsidian from 'obsidian'

import { LittleBot, ObsidianApi } from '@peaks/core'

export const ObsidianApiLive = Layer.effect(
  ObsidianApi,
  Effect.gen(function* () {
    const { app, manifest } = yield* LittleBot

    const getLanguage = () => Effect.succeed(obsidian.getLanguage())

    const getLittleBotPath = () => Effect.succeed(manifest.dir ?? `${app.vault.configDir}/plugins/${manifest.id}`)

    const getPlugin = (name: Lowercase<string>) => {
      const plugin = app.plugins?.enabledPlugins?.has(name)
        ? app.plugins.plugins?.[name]
        : undefined

      return plugin
        ? Either.right(plugin)
        : Either.left(`${name} not found in enabled plugins.`)
    }

    const normalizePath = (path: string) => {
      return Effect.succeed(obsidian.normalizePath(path))
    }

    const adapterRead = (incomingPath: string) =>
      Effect.gen(function* () {
        const path = yield* normalizePath(incomingPath)
        return yield* Effect.promise<string>(() => app.vault.adapter.read(path))
      })

    return {
      adapterRead,
      getLanguage,
      getLittleBotPath,
      getPlugin,
      normalizePath,
    }
  }),
)
