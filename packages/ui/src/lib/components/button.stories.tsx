import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'components/shadcn-ui/Button',
  component: Button,
  tags: ['autodocs', '!dev'],

  args: {
    className: 'hover:cursor-pointer',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'ghost', 'link', 'outline', 'secondary'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    disabled: false,
    variant: 'default',
  },
}
