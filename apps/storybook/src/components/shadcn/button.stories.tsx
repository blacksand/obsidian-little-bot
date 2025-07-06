import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, within } from 'storybook/test'

import { Button } from '@peaks/ui/components/button'

const meta: Meta<typeof Button> = {
  // title: 'components/shadcn-ui/Button',
  component: Button,
  tags: ['autodocs'],

  args: {
    id: 'button',
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
    onClick: fn(),
  },

  play: async ({ args, canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await userEvent.click(button)

    await expect(args.onClick).toHaveBeenCalled()
  },
}
