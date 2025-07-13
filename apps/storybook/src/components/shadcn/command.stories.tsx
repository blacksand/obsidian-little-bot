import type { Meta, StoryObj } from '@storybook/preact-vite'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@peaks/ui/components/command'

type CommandProps = Parameters<typeof Command>[0]

const meta = {
  // title: 'components/shadcn-ui/Command',
  component: Command,
  // preact do not supports sub components
  subcomponents: {
    // CommandEmpty,
    // CommandGroup,
    // CommandInput,
    // CommandItem,
    // CommandList,
    // CommandSeparator,
    // CommandShortcut,
  },
  tags: ['autodocs'],

  args: {
    // onAbort: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    onAbort: { action: 'abort' },
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} satisfies Meta<CommandProps>

export default meta

type Story = StoryObj<CommandProps>

export const Primary: Story = {
  render: (args) => (
    <div className="bs:max-w-[90vw] bs:w-sm">
      <Command className="bs:w-full bs:rounded-lg bs:border bs:shadow-md" {...args}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar/>
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile/>
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator/>
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator/>
          <CommandGroup heading="Settings">
            <CommandItem>
              <User/>
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard/>
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings/>
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
}
