#!/usr/bin env node

import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)

if (args.length < 2) {
  console.error(
    `[yev-stater error]: App creation failed. Usage: pnpm create-app <name> <template>`
  )
  process.exit(1)
}

const [name, template] = args

const appDir = path.join(__dirname, '../apps')
const appPath = path.join(appDir, name)

try {
  console.log(
    chalk.blue(
      `[yev-stater]: Creating app '${name}' with template '${template}' in /apps directory...`
    )
  )

  execSync(`pnpm create vite ${name} --template ${template}`, {
    cwd: appDir,
    stdio: 'pipe'
  })

  console.log(
    chalk.green(
      `[yev-stater]: App '${name}' created successfully in /apps/${name}`
    )
  )
} catch (error) {
  console.error(chalk.red('[yev-stater error]:', error.message))
  process.exit(1)
}
