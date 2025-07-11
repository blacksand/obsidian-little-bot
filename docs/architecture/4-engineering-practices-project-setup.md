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
| |-- /core/ # 核心数据结构，包括在项目间共享的基础数据结构及 Effect 依赖注入定义
| |-- /commands/ # 核心命令解析与管理逻辑
| |-- /nlp/ # 自然语言处理核心逻辑
| |-- /i18n/ # 国际化(i18n)相关功能
| |-- /obsidian/ # 与Obsidian API交互的特定逻辑
| |-- /settings/ # 插件设置管理
| |-- /ui/ # 共享 UI 组件库 (基于 shadcn/ui)
| |-- /utils/ # 通用工具函数
|-- nx.json
|-- pnpm-workspace.yaml
|-- package.json

## 4.2. Internal API Contract & Module Boundaries

为了保证代码库的长期健康，我们将通过 **Nx 的 ESLint 规则 nx/enforce-module-boundaries** 来严格执行内部包之间的依赖关系。

- **核心原则**: ui 层只与 `commands` 包通信，`commands` 包作为编排器调用其他底层包。`core` 定义了在项目间共享的基础数据结构。

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

## 4.6. Service Management with Effect

为了规范化服务定义、实现和依赖注入，我们引入了 **Effect** 库。所有服务都应遵循以下模式：

- **核心原则**: **接口与实现分离**。服务接口在 `packages/core` 中定义，具体实现在各自的功能包中提供。

- **实现模式**:
  1. **标准服务 (有依赖或复杂逻辑)**:
     - **接口定义**: 在 `packages/core` 中，使用 `Context.Tag` 创建一个服务的唯一标识符（Tag）。

       ```typescript
       // packages/core/src/lib/i18n/i18n-backend.ts
       import { Context } from 'effect'

       export class I18nBackend extends Context.Tag('@peaks/core/I18nBackend')<
          I18nBackend,
          Effect.Effect<BackendModule>
        >() {}
       ```

     - **实现**: 在具体的功能包中（如 `packages/i18n`），创建该接口的实现，并将其提供给一个 `Layer`。

       ```typescript
       // packages/i18n/src/lib/obsidian-i18n-backend.ts
       import { I18nBackend } from '@little-bot/core'
       import { Layer } from 'effect'

       export const I18nBackendLive = Layer.succeed(
         I18nBackend,
         I18nBackend.of({
           // ... implementation
         })
       )
       ```

  2. **简单服务 (无依赖关系)**:
     - 对于没有外部依赖的简单服务，可以直接使用 `Effect.Service` 类来快速定义和实现。

       ```typescript
       // packages/core/src/lib/logging/logging.ts
       import { Effect } from 'effect'

       export class Logging extends Effect.Service<Logging>()(
         '@peaks/core/Logging',
         {
           succeed: { getLogger: () => { /* ... implementation */ } },
         },
       ) {}
       ```
