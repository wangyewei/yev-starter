import type { PluginOption } from 'vite'
import type { ApplicationPluginOptions, ConditionPlugin } from '../typings'
import { VitePWA } from 'vite-plugin-pwa'
import viteVue from '@vitejs/plugin-vue'
import viteVueJsx from '@vitejs/plugin-vue-jsx'
import viteReact from '@vitejs/plugin-react'
import viteUnocss from 'unocss/vite'

async function loadCommonPlugins(
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
      plugins: () => [viteUnocss()]
    }
  ])
}

export async function loadVueApplicationPlugins(
  options: ApplicationPluginOptions
): Promise<PluginOption[]> {
  const commonPlugins = await loadCommonPlugins(options)
  const frameworkPlugins = await loadConditionPlugin([
    {
      condition: true,
      plugins: () => [
        viteVue({
          script: {
            defineModel: true
          }
        }),
        viteVueJsx()
      ]
    }
  ])

  return [...commonPlugins, ...frameworkPlugins]
}

export async function loadReactApplicationPlugins(
  options: ApplicationPluginOptions
): Promise<PluginOption[]> {
  const commonPlugins = await loadCommonPlugins(options)
  const frameworkPlugins = await loadConditionPlugin([
    {
      condition: true,
      plugins: () => [viteReact()]
    }
  ])

  return [...commonPlugins, ...frameworkPlugins]
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
