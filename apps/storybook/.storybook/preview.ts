import { withThemeByClassName } from '@storybook/addon-themes'
import type { PreactRenderer, Preview } from '@storybook/preact-vite'

import '../styles/global.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName<PreactRenderer>({
      defaultTheme: 'light',
      parentSelector: 'html,body',
      themes: {
        dark: 'theme-dark',
        light: 'theme-light',
      },
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default preview
