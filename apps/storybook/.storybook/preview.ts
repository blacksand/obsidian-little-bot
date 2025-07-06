import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react-vite'

import '../styles/global.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName<ReactRenderer>({
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
