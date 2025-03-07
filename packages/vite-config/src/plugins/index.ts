import type { PluginOption } from 'vite'
import type { ApplicationPluginOptions, ConditionPlugin } from '../typings'
import { VitePWA } from 'vite-plugin-pwa'
import viteVue from '@vitejs/plugin-vue'
import viteVueJsx from '@vitejs/plugin-vue-jsx'
import viteUnocss from 'unocss/vite'

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
    },
    {
      condition: true,
      plugins: () => [
        viteVue({
          script: {
            defineModel: true
            // propsDestructure: true,
          }
        }),
        viteVueJsx()
      ]
    },
    {
      condition: true,
      plugins: () => [viteUnocss()]
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
