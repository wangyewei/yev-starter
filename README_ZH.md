<div align="right">
  <strong>中文</strong> | <a href="https://github.com/wangyewei/yev-starter/blob/main/README.md">English</a>
</div>

# Yev Starter

基于 TurboRepo 的现代 Web 应用开发模板。

![GitHub License](https://img.shields.io/github/license/wangyewei/yev-stater)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/wangyewei/yev-starter/.github%2Fworkflows%2Fci.yaml)
![GitHub stars](https://img.shields.io/github/stars/wangyewei/yev-starter?style=social)

## 功能特性

- 🚀 基于 TurboRepo 的 Monorepo 架构
- ⚡ 使用 Vite 实现极速开发体验
- 🎨 集成 UnoCSS 原子化 CSS
- 📦 预配置 TypeScript 支持
- 🔄 内置 GitHub Actions CI 工作流
- � 包含以下预设配置：
  - `vite-config` Vite 配置
  - `uno-config` UnoCSS 配置
  - `ts-config` TypeScript 配置
 
 
## 快速开始

- Bootstrap

```sh
pnpm bootstrap
```

- 启动

```sh
pnpm dev
```

### 项目结构

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

基于[MIT License](https://github.com/wangyewei/yev/blob/main/LICENSE)发布。
