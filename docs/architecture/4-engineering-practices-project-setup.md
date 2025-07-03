# 4. Engineering Practices & Project Setup

## 4.1. Project Structure (Monorepo)

我们将采用由 **Nx** 编排的 **pnpm monorepo** 结构，以实现最大程度的模块化、可测试性和可维护性。

/obsidian-plugin-little-bot
|-- /apps
| |-- /little-bot/ # Obsidian 插件的核心应用
| |-- /storybook/ # Storybook 应用，用于 UI 组件预览与测试
|-- /packages
| |-- /config-eslint/ # 共享的 ESLint 配置
| |-- /config-tailwind/ # 共享的 Tailwind CSS 配置
| |-- /config-testing/ # 共享的测试配置 (Vitest, Playwright)
| |-- /commands/ # 核心命令解析与管理逻辑
| |-- /nlp/ # 自然语言处理核心逻辑
| |-- /obsidian-mock/ # Obsidian API 的模拟库，用于测试
| |-- /ui/ # 共享 UI 组件库 (基于 shadcn/ui)
| |-- /utils/ # 通用工具函数 (将包含 logger)
| |-- /.../ # 其他功能包
|-- nx.json
|-- pnpm-workspace.yaml
|-- package.json

## 4.2. Internal API Contract & Module Boundaries

为了保证代码库的长期健康，我们将通过 **Nx 的 ESLint 规则 nx/enforce-module-boundaries** 来严格执行内部包之间的依赖关系。

- **核心原则**: UI 层只与 commands 包通信，commands 包作为编排器调用其他底层包。

## 4.3. State Management Philosophy

- **核心原则**: **避免使用全局状态管理库**。
- **实现方式**: 优先使用组件本地状态 (useState)，当状态需要在多个组件间共享时，使用 **React Context**。

## 4.4. Developer Experience & Scaffolding

- **核心原则**: 通过自动化工具提升开发效率和代码一致性。
- **实现方式**: 我们将开发一个**自定义的 Nx 插件 (Generator)**，用于自动化地创建符合我们所有规范的新模块和组件。

## 4.5. CI/CD and Release Workflow

- **核心原则**: 采用现代化的、自动化的流程来管理版本和发布。
- **实现方式**:
  1. **提交规范**: 所有 git commit **必须**遵循 **Conventional Commits** 规范。
  2. **版本与发布**: 使用 **nx release** 命令来自动化版本管理。
  3. **持续集成 (CI/CD)**: **GitHub Actions** 将被用于自动化测试、构建和发布流程。
