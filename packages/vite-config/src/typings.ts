import type { ConfigEnv, UserConfig } from 'vite'
import type { Options as PwaOptions } from 'vite-plugin-pwa'
import type { PluginOption } from 'vite'

export type DefineApplicationConfig = (config?: ConfigEnv) => Promise<{
  vite?: UserConfig
}>

export interface CommonPluginOptions {
  mode?: string
}

export interface ApplicationPluginOptions extends CommonPluginOptions {
  pwa?: boolean
  pwaOptions?: Partial<PwaOptions>
}

export interface ConditionPlugin {
  condition?: boolean

  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>
}
