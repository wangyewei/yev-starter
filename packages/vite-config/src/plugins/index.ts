import type { PluginOption } from 'vite'
import type { ApplicationPluginOptions, ConditionPlugin } from '../typings'
import { VitePWA } from 'vite-plugin-pwa'

export async function loadApplicationPlugins(
  options: ApplicationPluginOptions
): Promise<PluginOption[]> {
  const { pwaOptions, pwa } = options

  return await loadConditionPlugin([
    {
      condition: pwa,
      plugins: () =>
        VitePWA({
          injectRegister: false,
          workbox: {
            globPatterns: []
          },
          ...pwaOptions,
          manifest: {
            display: 'standalone',
            start_url: '/',
            theme_color: '#ffffff',
            ...pwaOptions?.manifest
          }
        })
    }
  ])
}

async function loadConditionPlugin(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = []

  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins()
      plugins.push(...realPlugins)
    }
  }

  return plugins.flat()
}
