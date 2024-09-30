import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import dotenv from 'dotenv'

function getConfigFiles() {
  const script = process.env.npm_lifecycle_script as string
  const regex = /--mode ([\d_a-z]+)/
  const result = regex.exec(script)

  if (!result) return ['.env', '.env.production']

  const mode = result[1]
  return ['.env', `.env.${mode}`]
}

export async function loadEnv<T = Record<string, string>>(
  match = 'VITE_GLOB_',
  configFiles = getConfigFiles()
) {
  let envConfig = {}

  for (const confFile of configFiles) {
    try {
      const envPath = await fs.readFile(join(process.cwd(), confFile), {
        encoding: 'utf-8'
      })

      const env = dotenv.parse(envPath)
      envConfig = Object.assign(envConfig, env)
    } catch {
      console.error(
        `[@yev-stater/vite-config error]: Error while parsing ${confFile}`
      )
    }
  }

  const regex = new RegExp(`^(${match})`)

  Object.keys(envConfig).forEach((key) => {
    if (!regex.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })

  return envConfig as T
}

export async function loadAndConvertEnv(
  match = 'VITE_',
  confFile = getConfigFiles()
): Promise<{ appTitle: string; base: string }> {
  const envConfig = await loadEnv(match, confFile)

  const { VITE_APP_TITLE, VITE_BASE } = envConfig

  return {
    appTitle: getString(VITE_APP_TITLE, 'yev-stater'),
    base: getString(VITE_BASE, '/')
  }
}
const getString = (value: string | undefined, fallback: string) =>
  value ?? fallback
