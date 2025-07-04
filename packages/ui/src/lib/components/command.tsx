import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@peaks/ui/utils'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'

/**
 * Base Command component that provides a container for command palette functionality
 * @param props - React component props extending CommandPrimitive properties
 * @param props.className - Additional CSS classes to apply to the command container
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className,
      )}
      data-slot="command"
      {...props}
    />
  )
}

/**
 * Dialog wrapper for the Command component with built-in accessibility features
 * @param props - React component props extending Dialog properties
 * @param props.title - Dialog title text (defaults to 'Command Palette')
 * @param props.children - Child components to render within the command dialog
 * @param props.className - Additional CSS classes to apply to the dialog content
 * @param props.description - Dialog description text (defaults to 'Search for a command to run...')
 * @param props.showCloseButton - Whether to show the close button (defaults to true)
 */
function CommandDialog({
  title = 'Command Palette',
  children,
  className,
  description = 'Search for a command to run...',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  className?: string
  description?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command
          className={`
            [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2
            [&_[cmdk-group-heading]]:font-medium
            **:data-[slot=command-input-wrapper]:h-12
            [&_[cmdk-group]]:px-2
            [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0
            [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5
            [&_[cmdk-input]]:h-12
            [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3
            [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5
          `}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Input component for the command palette with search icon
 * @param props - React component props extending CommandPrimitive.Input properties
 * @param props.className - Additional CSS classes to apply to the input element
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      className="flex h-9 items-center gap-2 border-b px-3"
      data-slot="command-input-wrapper"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          `
            placeholder:text-muted-foreground
            flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden
            disabled:cursor-not-allowed disabled:opacity-50
          `,
          className,
        )}
        data-slot="command-input"
        {...props}
      />
    </div>
  )
}

/**
 * Container component for command items with scrolling behavior
 * @param props - React component props extending CommandPrimitive.List properties
 * @param props.className - Additional CSS classes to apply to the list container
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        className,
      )}
      data-slot="command-list"
      {...props}
    />
  )
}

/**
 * Component displayed when no commands match the search criteria
 * @param props - React component props extending CommandPrimitive.Empty properties
 */
function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className="py-6 text-center text-sm"
      data-slot="command-empty"
      {...props}
    />
  )
}

/**
 * Groups related command items together with an optional heading
 * @param props - React component props extending CommandPrimitive.Group properties
 * @param props.className - Additional CSS classes to apply to the group container
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        `
          text-foreground overflow-hidden p-1
          [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2
          [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs
          [&_[cmdk-group-heading]]:font-medium
        `,
        className,
      )}
      data-slot="command-group"
      {...props}
    />
  )
}

/**
 * Visual separator between command groups or items
 * @param props - React component props extending CommandPrimitive.Separator properties
 * @param props.className - Additional CSS classes to apply to the separator
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn('bg-border -mx-1 h-px', className)}
      data-slot="command-separator"
      {...props}
    />
  )
}

/**
 * Individual command item that can be selected and triggered
 * @param props - React component props extending CommandPrimitive.Item properties
 * @param props.className - Additional CSS classes to apply to the item
 */
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        `
          data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground
          [&_svg:not([class*='text-'])]:text-muted-foreground
          relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm
          outline-hidden select-none
          data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50
          [&_svg]:pointer-events-none [&_svg]:shrink-0
          [&_svg:not([class*='size-'])]:size-4
        `,
        className,
      )}
      data-slot="command-item"
      {...props}
    />
  )
}

/**
 * Displays keyboard shortcut hints for command items
 * @param props - React component props extending HTML span element properties
 * @param props.className - Additional CSS classes to apply to the shortcut text
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      data-slot="command-shortcut"
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
