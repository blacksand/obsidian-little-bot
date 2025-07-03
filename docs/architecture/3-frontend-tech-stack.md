# 3. Frontend Tech Stack

| Category                 | Technology            | Version   | Purpose                   | Rationale                                                      |
| :----------------------- | :-------------------- | :-------- | :------------------------ | :------------------------------------------------------------- |
| **语言 (Language)**      | TypeScript            | ~5.4.0    | 提供类型安全，减少错误    | 与Obsidian插件开发生态兼容，提升代码质量和可维护性。           |
| **框架 (Framework)**     | React                 | ~18.2.0   | 构建用户界面的核心库      | shadcn/ui 基于React构建，拥有庞大的生态和社区支持。            |
| **Monorepo 编排器**      | Nx                    | ~19.0.0   | 智能任务运行与缓存        | 为复杂的monorepo提供依赖关系图分析和高效的任务编排。           |
| **插件构建工具**         | @nx/esbuild           | latest    | 构建和打包整个插件        | 极快的构建速度，将所有包的源码打包成Obsidian所需的单一JS文件。 |
| **UI 组件库**            | shadcn/ui             | latest    | 构建指令面板的核心组件    | 美观、可访问性好，且基于Tailwind。                             |
| **样式方案 (Styling)**   | Tailwind CSS          | v4.0-beta | 实现所有UI样式            | 通过@theme指令能更好地与Obsidian主题集成。                     |
| **测试框架 (Testing)**   | Vitest                | ~1.6.0    | 对所有包进行单元/组件测试 | 与TypeScript和React无缝集成，性能出色。                        |
| **测试库 (Testing Lib)** | React Testing Library | ~15.0.0   | 模拟用户交互，测试组件    | 鼓励编写面向用户行为的测试，确保组件的健壮性。                 |
| **包管理器**             | pnpm                  | ~9.1.0    | 依赖管理                  | 速度快，节省磁盘空间，并与Nx monorepo协同工作。                |
