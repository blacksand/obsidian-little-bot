import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
// import { within } from '@storybook/testing-library';
// import { expect } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Button',
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
//
// export const Secondary: Story = {
//   args: {
//     children: 'Button',
//     disabled: false,
//     variant: 'secondary',
//   },
// }

// export const Heading: Story = {
//   args: {
//     text: '',
//     padding: 0,
//     disabled: false,
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/Welcome to Button!/gi)).toBeTruthy();
//   },
// };
