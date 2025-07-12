/* eslint-disable unicorn/consistent-function-scoping */
import { Effect, Either, Layer } from 'effect'
import type { Debouncer } from 'obsidian'
import * as obsidian from 'obsidian'

import { LittleBot, ObsidianApi } from '@peaks/core'

export const ObsidianApiLive = Layer.effect(
  ObsidianApi,
  Effect.gen(function* () {
    const { app, manifest } = yield* LittleBot

    const adapterExists = (normalizedPath: string, sensitive?: boolean) => {
      return Effect.promise(() => app.vault.adapter.exists(normalizedPath, sensitive))
    }

    const adapterRead = (normalizedPath: string) => {
      return Effect.promise(() => app.vault.adapter.read(normalizedPath))
    }

    const adapterWrite = (normalizedPath: string, content: string, options?: obsidian.DataWriteOptions) => {
      return Effect.promise(() => app.vault.adapter.write(normalizedPath, content, options))
    }

    const debounce = <T extends unknown[], V>(
      callback: (...args: [...T]) => V,
      timeout?: number,
      resetTimer?: boolean,
    ): Effect.Effect<Debouncer<T, V>> => {
      return Effect.succeed(obsidian.debounce(callback, timeout, resetTimer))
    }

    const getLanguage = () => {
      return Effect.succeed(obsidian.getLanguage())
    }

    const getLittleBotPath = () => {
      return Effect.succeed(manifest.dir ?? `${app.vault.configDir}/plugins/${manifest.id}`)
    }

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

    return {
      adapterExists,
      adapterRead,
      adapterWrite,
      debounce,
      getLanguage,
      getLittleBotPath,
      getPlugin,
      normalizePath,
    }
  }),
)
