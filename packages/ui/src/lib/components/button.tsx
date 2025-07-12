import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@peaks/ui/utils'

const buttonVariants = cva(
  `
    bs:inline-flex bs:items-center bs:justify-center bs:gap-2 bs:whitespace-nowrap bs:rounded-md
    bs:text-sm bs:font-medium bs:transition-all bs:disabled:pointer-events-none
    bs:disabled:opacity-50 bs:[&_svg]:pointer-events-none bs:[&_svg:not([class*=size-])]:size-4
    bs:shrink-0 bs:[&_svg]:shrink-0 bs:outline-none bs:focus-visible:border-ring
    bs:focus-visible:ring-ring/50 bs:focus-visible:ring-[3px] bs:aria-invalid:ring-destructive/20
    bs:dark:aria-invalid:ring-destructive/40 bs:aria-invalid:border-destructive
  `,
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'bs:h-9 bs:px-4 bs:py-2 bs:has-[>svg]:px-3',
        icon: 'bs:size-9',
        lg: 'bs:h-10 bs:rounded-md bs:px-6 bs:has-[>svg]:px-4',
        sm: 'bs:h-8 bs:rounded-md bs:gap-1.5 bs:px-3 bs:has-[>svg]:px-2.5',
      },
      variant: {
        default:
          'bs:bg-primary bs:text-primary-foreground bs:shadow-xs bs:hover:bg-primary/90',
        destructive:
          `
            bs:bg-destructive bs:text-white bs:shadow-xs bs:hover:bg-destructive/90
            bs:focus-visible:ring-destructive/20 bs:dark:focus-visible:ring-destructive/40
            bs:dark:bg-destructive/60
          `,
        ghost:
          'bs:hover:bg-accent bs:hover:text-accent-foreground bs:dark:hover:bg-accent/50',
        link: 'bs:text-primary bs:underline-offset-4 bs:hover:underline',
        outline:
          `
            bs:border bs:bg-background bs:shadow-xs bs:hover:bg-accent
            bs:hover:text-accent-foreground bs:dark:bg-input/30 bs:dark:border-input
            bs:dark:hover:bg-input/50
          `,
        secondary:
          'bs:bg-secondary bs:text-secondary-foreground bs:shadow-xs bs:hover:bg-secondary/80',
      },
    },
  },
)

function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      data-slot="button"
      {...props}
    />
  )
}

export { Button, buttonVariants }
