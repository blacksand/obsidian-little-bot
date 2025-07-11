# Little Bot for Obsidian

**Little Bot** is an Obsidian plugin that supercharges your workflow by allowing you to execute complex commands using natural language. It acts as an intelligent layer on top of Obsidian's powerful features, making automation accessible to everyone.

This project is a monorepo managed by **Nx** and **pnpm**.

## ✨ Key Features

- **Natural Language Commands**: Simply type what you want to do, and Little Bot will handle the rest.
- **Customizable Workflows**: Define your own commands and workflows using simple templates in your Obsidian notes.
- **Seamless Integration**: Designed to work with your existing Obsidian setup and other plugins like Dataview.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/blacksand/obsidian-little-bot.git
   cd obsidian-little-bot
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Development

To build the plugin for development and watch for changes, run:

```bash
pnpm dev
```

This will create a `main.js`, `manifest.json`, and `styles.css` in the `dist/apps/little-bot` directory. You can then manually copy this directory into your Obsidian vault's `.plugins` directory to test the plugin.

## 🛠️ Project Structure

This monorepo is organized into `apps` and `packages`:

- **`apps/`**: Contains the main application code.
  - `little-bot`: The core Obsidian plugin.
  - `storybook`: A Storybook instance for developing and testing UI components in isolation.
- **`packages/`**: Contains reusable code shared across the monorepo.
  - `core`: Core data structures and service definitions.
  - `ui`: Shared React components for the UI.
  - `i18n`: Internationalization and localization.
  - `obsidian`: Interaction with the Obsidian API.
  - `...and more`: Other specialized packages for configuration, testing, etc.

## 🧪 Running Tests

To run all tests across the monorepo, use:

```bash
pnpm test
```

## ⚙️ Available Scripts

- `pnpm build`: Builds the plugin for production.
- `pnpm dev`: Builds the plugin in development mode and watches for changes.
- `pnpm lint`: Lints the entire codebase.
- `pnpm test`: Runs all tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
