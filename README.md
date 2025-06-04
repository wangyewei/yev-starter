<div align="right">
  <a href="https://github.com/wangyewei/yev-starter/blob/main/README_ZH.md">中文</a> | <strong>English</strong>
</div>

# Yev Starter

A TurboRepo template for modern web app development with integrated configurations.

![GitHub License](https://img.shields.io/github/license/wangyewei/yev-stater)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/wangyewei/yev-starter/.github%2Fworkflows%2Fci.yaml)
![GitHub stars](https://img.shields.io/github/stars/wangyewei/yev-starter?style=social)

## Features

- 🚀 TurboRepo powered monorepo structure
- ⚡ Vite for blazing fast development
- 🎨 UnoCSS for atomic CSS
- 📦 Pre-configured TypeScript
- 🔄 GitHub Actions CI workflow
- 📐 Includes:
  - `vite-config`
  - `uno-config`
  - `ts-config`
 
## Quick Start

- Bootstrap

```sh
pnpm bootstrap
```

- start

```sh
pnpm dev
```

### Project Structure

```sh
yev-starter
├─ .node-version
├─ .npmrc
├─ .prettierrc.json
├─ LICENSE
├─ README.md
├─ README_ZH.md
├─ apps
│  ├─ react-16
│  └─ vue3-jsx
├─ package.json
├─ packages
│  ├─ enhance-api
│  ├─ shared
│  ├─ tsconfig
│  ├─ uno-config
│  └─ vite-config
├─ plugins
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ scripts
├─ templates
│  ├─ pkg.json
│  └─ tsconfig.json
├─ turbo.json
└─ yev-stater.code-workspace
```


## License

&copy; 2024 Yev Wang rights reserved.

The code licensed under the [MIT License](https://github.com/wangyewei/yev/blob/main/LICENSE)
