import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@peaks/ui/utils'

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        `
          bs:data-[state=open]:animate-in bs:data-[state=closed]:animate-out
          bs:data-[state=closed]:fade-out-0 bs:data-[state=open]:fade-in-0 bs:fixed bs:inset-0
          bs:z-50 bs:bg-black/50
        `,
        className,
      )}
      data-slot="dialog-overlay"
      {...props}
    />
  )
}

function DialogContent({
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          `
            bs:bg-background bs:data-[state=open]:animate-in bs:data-[state=closed]:animate-out
            bs:data-[state=closed]:fade-out-0 bs:data-[state=open]:fade-in-0
            bs:data-[state=closed]:zoom-out-95 bs:data-[state=open]:zoom-in-95 bs:fixed bs:top-[50%]
            bs:left-[50%] bs:z-50 bs:grid bs:w-full bs:max-w-[calc(100%-2rem)] bs:translate-x-[-50%]
            bs:translate-y-[-50%] bs:gap-4 bs:rounded-lg bs:border bs:p-6 bs:shadow-lg
            bs:duration-200 bs:sm:max-w-lg
          `,
          className,
        )}
        data-slot="dialog-content"
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={`
              bs:ring-offset-background bs:focus:ring-ring bs:data-[state=open]:bg-accent
              bs:data-[state=open]:text-muted-foreground bs:absolute bs:top-4 bs:right-4
              bs:rounded-xs bs:opacity-70 bs:transition-opacity bs:hover:opacity-100 bs:focus:ring-2
              bs:focus:ring-offset-2 bs:focus:outline-hidden bs:disabled:pointer-events-none
              bs:[&_svg]:pointer-events-none bs:[&_svg]:shrink-0
              bs:[&_svg:not([class*=size-])]:size-4
            `}
            data-slot="dialog-close"
          >
            <XIcon />
            <span className="bs:sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bs:flex bs:flex-col bs:gap-2 bs:text-center bs:sm:text-left', className)}
      data-slot="dialog-header"
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bs:flex bs:flex-col-reverse bs:gap-2 bs:sm:flex-row bs:sm:justify-end',
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn('bs:text-lg bs:leading-none bs:font-semibold', className)}
      data-slot="dialog-title"
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('bs:text-muted-foreground bs:text-sm', className)}
      data-slot="dialog-description"
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
