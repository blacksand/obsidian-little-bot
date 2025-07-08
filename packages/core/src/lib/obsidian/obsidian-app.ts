import type { App, Plugin, PluginManifest } from 'obsidian'

export interface ObsidianApp extends App {
  plugins?: {
    enabledPlugins?: Set<string>
    manifests?: Record<string, PluginManifest>
    plugins?: Record<string, Plugin>
  }
}
