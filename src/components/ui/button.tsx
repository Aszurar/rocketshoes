import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Spinner } from '../spinner'

const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary active:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive active:bg-destructive/80',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:hover:bg-background active:bg-accent/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:hover:bg-secondary active:bg-secondary/70',
        ghost:
          'hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent active:bg-accent/80',
        link: 'text-primary underline-offset-4 hover:underline disabled:hover:underline-none active:underline-offset-2',
      },
      size: {
        default: 'text-md h-10 px-4 py-2',
        sm: 'text-sm h-9 rounded-md px-3',
        lg: 'text-lg h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        xs: 'text-xs h-8 px-3',
        '2xs': 'h-7 px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const content = isLoading ? <Spinner size={24} /> : children
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled ?? isLoading}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
