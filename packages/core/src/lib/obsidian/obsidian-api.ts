import type { App, Plugin, PluginManifest } from 'obsidian'

export interface ObsidianApp extends App {
  plugins?: {
    enabledPlugins?: Set<string>
    manifests?: Record<string, PluginManifest>
    plugins?: Record<string, Plugin>
  }
}

export class ObsidianApi {
  constructor(readonly app: ObsidianApp) {}

  getPlugin(name: Lowercase<string>) {
    return this.app.plugins?.enabledPlugins?.has(name)
      ? this.app.plugins.plugins?.[name]
      : undefined
  }
}
