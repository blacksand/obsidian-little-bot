import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'

export { type FlatConfigComposer } from 'eslint-flat-config-utils'

type BaseOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>

interface ExtraOptions {
  a11y?: boolean // 是否允许 a11y 检测
  allowDefaultProject?: string[] // 允许的默认项目
  appPath?: string
  next?: boolean // 是否允许 next
  projectRoot?: string // 项目根目录
  tailwindcss?: string | boolean // 是否允许 tailwind
}

export type Options = Omit<BaseOptions, keyof ExtraOptions> & ExtraOptions
