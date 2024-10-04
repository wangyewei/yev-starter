import { type UserConfig, mergeConfig, defineConfig } from 'vite'
import { loadAndConvertEnv } from './utils/env'
import type { DefineApplicationConfig } from './typings'
import { findUpSync } from 'find-up'
import path, { dirname, relative } from 'node:path'
import { loadApplicationPlugins } from './plugins'
import type { Options as PWAPluginOptions } from 'vite-plugin-pwa'

export function defineApplicationConfig(
  userConfigPromise?: DefineApplicationConfig
) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config)

    const { command } = config
    const { vite = {} } = options || {}
    const { base, appTitle, port } = await loadAndConvertEnv()

    const isBuild = command === 'build'
    const plugins = await loadApplicationPlugins({
      pwa: true,
      pwaOptions: getDefaultPwaOptions(appTitle)
    })
    const applicationConfig: UserConfig = {
      base,
      plugins,
      build: {
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].mjs',
            entryFileNames: 'jse/index-[name]-[hash].mjs'
          }
        },
        target: 'es2015'
      },
      esbuild: {
        drop: isBuild ? ['debugger'] : [],
        legalComments: 'none'
      },

      css: createCssOptions(),
      server: {
        host: true,
        port,
        warmup: {
          clientFiles: ['./index.html', './src/{views,layouts,router,store}/*']
        }
      }
    }

    return mergeConfig(applicationConfig, vite)
  })
}

function createCssOptions(injectGlobalScss = false) {
  const root = findMonorepoRoot()

  return {
    preprocessorOptions: injectGlobalScss
      ? {
          scss: {
            additionalData: (content: string, filepath: string) => {
              const relativePath = relative(root, filepath)
              if (relativePath.startsWith(`apps${path.sep}`)) {
                return `@import "@yev-stater/styles/global";\n${content}`
              }
              return content
            }
          }
        }
      : {}
  }
}

function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync(
    ['pnpm-lock.yaml', 'yarn.lock', 'package-lock.json'],
    {
      cwd,
      type: 'file'
    }
  )
  return dirname(lockFile || '')
}

const isDevelopment = process.env.NODE_ENV === 'development'
function getDefaultPwaOptions(name: string): Partial<PWAPluginOptions> {
  return {
    manifest: {
      description: 'YevStater is a personal web app scaffold',

      icons: [
        {
          sizes: '192x192',
          src: 'https://unpkg.com/@vbenjs/static-source@0.1.6/source/pwa-icon-192.png',
          type: 'image/png'
        },
        {
          sizes: '512x512',
          src: 'https://unpkg.com/@vbenjs/static-source@0.1.6/source/pwa-icon-512.png',
          type: 'image/png'
        }
      ],
      name: `${name}${isDevelopment ? ' dev' : ''}`,
      short_name: `${name}${isDevelopment ? ' dev' : ''}`
    }
  }
}
