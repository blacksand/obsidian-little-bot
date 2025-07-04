import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react-vite'

import '../styles/global.css'

const preview: Preview = {
  // ...rest of preview
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        dark: 'dark',
        light: 'light',
      },
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default preview
