import fs from 'fs'
import path from 'path'
import { type Plugin } from 'vite'

export default function versionGen(): Plugin {
  return {
    name: '@yev-stater-plugin-version-gen',
    apply: 'build',
    buildEnd() {
      const packageJsonPath = path.resolve(process.cwd(), 'package.json')
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

      const version = packageJson.version

      const outputPath = path.resolve(process.cwd(), 'public', 'version.json')
      const versionInfo = { version }
      fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2))

      console.log(`Version ${version} written to public/version.json`)
    }
  }
}
