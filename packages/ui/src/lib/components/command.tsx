import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { cn } from '@peaks/ui/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog'

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        `
          bs:bg-popover bs:text-popover-foreground bs:flex bs:h-full bs:w-full bs:flex-col
          bs:overflow-hidden bs:rounded-md
        `,
        className,
      )}
      data-slot="command"
      {...props}
    />
  )
}

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
      <DialogHeader className="bs:sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('bs:overflow-hidden bs:p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command className={`
          bs:[&_[cmdk-group-heading]]:text-muted-foreground
          bs:**:data-[slot=command-input-wrapper]:h-12 bs:[&_[cmdk-group-heading]]:px-2
          bs:[&_[cmdk-group-heading]]:font-medium bs:[&_[cmdk-group]]:px-2
          bs:[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 bs:[&_[cmdk-input-wrapper]_svg]:h-5
          bs:[&_[cmdk-input-wrapper]_svg]:w-5 bs:[&_[cmdk-input]]:h-12 bs:[&_[cmdk-item]]:px-2
          bs:[&_[cmdk-item]]:py-3 bs:[&_[cmdk-item]_svg]:h-5 bs:[&_[cmdk-item]_svg]:w-5
        `}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      className="bs:flex bs:h-9 bs:items-center bs:gap-2 bs:px-1"
      data-slot="command-input-wrapper"
    >
      {/* <SearchIcon className="bs:size-4 bs:shrink-0 bs:opacity-50" /> */}
      <CommandPrimitive.Input
        className={cn(
          `
            bs:placeholder:text-muted-foreground bs:flex bs:h-10 bs:w-full bs:rounded-md
            bs:bg-transparent bs:py-3 bs:text-sm bs:outline-hidden bs:disabled:cursor-not-allowed
            bs:disabled:opacity-50
          `,
          className,
        )}
        data-slot="command-input"
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(
        'bs:max-h-[300px] bs:scroll-py-1 bs:overflow-x-hidden bs:overflow-y-auto',
        className,
      )}
      data-slot="command-list"
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className="bs:py-6 bs:text-center bs:text-sm"
      data-slot="command-empty"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        `
          bs:text-foreground bs:[&_[cmdk-group-heading]]:text-muted-foreground bs:overflow-hidden
          bs:p-1 bs:[&_[cmdk-group-heading]]:px-2 bs:[&_[cmdk-group-heading]]:py-1.5
          bs:[&_[cmdk-group-heading]]:text-xs bs:[&_[cmdk-group-heading]]:font-medium
        `,
        className,
      )}
      data-slot="command-group"
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn('bs:bg-border bs:-mx-1 bs:h-px', className)}
      data-slot="command-separator"
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        `
          bs:group/item bs:data-[selected=true]:bg-accent
          bs:data-[selected=true]:text-accent-foreground
          bs:data-[selected=true]:[&_svg:not([class*=text-])]:text-accent-foreground
          bs:[&_svg:not([class*=text-])]:text-muted-foreground bs:relative bs:flex bs:cursor-default
          bs:items-center bs:gap-2 bs:rounded-sm bs:px-2 bs:py-1.5 bs:text-sm bs:outline-hidden
          bs:select-none bs:data-[disabled=true]:pointer-events-none
          bs:data-[disabled=true]:opacity-50 bs:[&_svg]:pointer-events-none bs:[&_svg]:shrink-0
          bs:[&_svg:not([class*=size-])]:size-4
        `,
        className,
      )}
      data-slot="command-item"
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        `
          bs:text-muted-foreground bs:group-data-[selected=true]/item:text-accent-foreground
          bs:ml-auto bs:text-xs bs:tracking-widest
        `,
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
