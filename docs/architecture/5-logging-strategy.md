# 5. Logging Strategy

为了在开发过程中获得强大的调试能力，同时严格遵守Obsidian插件的发布规范，我们将实现一个灵活的、环境感知的日志记录系统。

- **核心原则**: **严禁**在最终发布的生产版本代码中包含任何 console.log 调用。
- **实现方式**:
  1. 我们将在 packages/utils 中创建一个专用的 logger 模块。
  2. 该模块将提供多个日志级别，例如 logger.debug(), logger.info(), logger.warn(), logger.error()。
  3. 所有对 console 的调用都将包含在条件块中，该条件块会检查 process.env.NODE_ENV 的值。

     ```typescript
     // packages/utils/logger.ts
     export const logger = {
       debug: (message: string, ...args: any[]) => {
         if (process.env.NODE_ENV === 'development') {
           console.debug(`[Little Bot Debug]: ${message}`, ...args)
         }
       },
       // ... 其他级别
     }
     ```

  4. **死代码消除**: 在生产构建时（NODE_ENV 为 'production'），@nx/esbuild 构建工具会自动将这些 if 代码块（包括其中的 console 调用）从最终的 main.js 文件中完全移除。

- **好处**:
  - **开发时**: 开发者可以自由使用 logger.debug() 来输出详细的调试信息。
  - **发布时**: 最终产物干净、合规，不含任何控制台日志。
