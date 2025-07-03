# Epic 1: Core Engine and Basic Commands

**Epic Goal**: Establish the plugin's foundational framework and core command parsing engine, delivering the first non-interactive command (insert date) to validate the end-to-end execution flow.

## Story 1.1 Loading and Parsing Note-Based Command Templates

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 在一篇或多篇普通的 Obsidian 笔记中定义我的 "Little Bot" 指令,
- **以便于 (so that)** 我可以使用我熟悉的笔记和 Dataview 语法来轻松地查看和管理我的自定义指令。
- **验收标准**:
  1. 插件启动时必须检查 Dataview 插件是否已安装并启用。如果未启用，应在插件设置中或通过通知(Notice)提醒用户，"Little Bot" 的指令功能需要 Dataview 插件。
  2. 插件启动后，使用 Dataview API 查找所有包含特定属性（例如 type:: command-template）的笔记。
  3. 插件必须能够解析这些笔记中的内容（例如，一个特定语言的代码块或 frontmatter区域）来抽取出意图和参数的定义。
  4. 系统必须能够优雅地处理找到多篇命令模板笔记的情况，例如将所有定义合并在一起。
  5. 如果某一篇命令模板笔记中存在语法错误，插件应跳过该笔记的加载，并在开发者控制台记录一条清晰、用户友好的错误信息，指出是哪一篇笔记出了问题。

## Story 1.2 Implementing the "Insert Date" Command Executor

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我的“插入日期”意图被识别时，系统能在我的光标位置插入当前日期,
- **以便于 (so that)** 我可以快速地为我的笔记添加时间戳。
- **验收标准**:
  1. 系统内存在一个函数或模块，当被调用时，能够获取当前的日期。
  2. 日期会根据一个预定义的默认格式（例如 YYYY-MM-DD）进行格式化。
  3. 格式化后的日期字符串被正确地插入到当前激活的编辑器中的光标所在位置。

## Story 1.3 Connecting the Core Intent Engine with Individual Commands

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我输入用于插入日期的指令时，“Little Bot”的引擎能够识别出该意图并触发正确的操作,
- **以便于 (so that)** 我的指令能够被成功执行。
- **验收标准**:
  1. 系统能够通过一种方式（例如，一个命令面板中的命令）来接收用户的输入。
  2. 当用户的输入与“插入日期”意图的模式（来源于已解析的模板文件）相匹配时，系统能够正确地识别出该意图。
  3. Story 1.2 中定义的“插入日期”指令执行器被成功调用。
  4. 从用户输入到日期成功插入的整个端到端流程是功能完备且可测试的。
