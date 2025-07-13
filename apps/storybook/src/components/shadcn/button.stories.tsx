import type { Meta, StoryObj } from '@storybook/preact-vite'
import { expect, fn, within } from 'storybook/test'

import { Button } from '@peaks/ui/components/button'

type ButtonProps = Parameters<typeof Button>[0]

const meta: Meta<ButtonProps> = {
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
type Story = StoryObj<ButtonProps>

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
