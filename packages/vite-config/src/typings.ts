import type { ConfigEnv, UserConfig } from 'vite'

export type DefineApplicationConfig = (config?: ConfigEnv) => Promise<{
  vite?: UserConfig
}>
