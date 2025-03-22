import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Spinner } from '../spinner'

const buttonVariants = cva(
  cn(
    'text-sm font-semibold',
    'inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md',
    'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
    'disabled:cursor-not-allowed disabled:opacity-50 ',
    'animate-shine bg-[length:400%_100%] transition-colors',
  ),
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background hover:opacity-85 disabled:hover:opacity-100 active:opacity-90 data-[animated-shine=true]:bg-shine-animated-default dark:data-[animated-shine=true]:text-foreground ',
        primary:
          'bg-primary text-primary-foreground hover:brightness-110 disabled:hover:brightness-100 active:brightness-90 data-[animated-shine=true]:bg-shine-animated-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:brightness-110 disabled:hover:bg-destructive active:brightness-90 data-[animated-shine=true]:bg-shine-animated-destructive',
        success:
          'bg-success text-success-foreground hover:brightness-110 disabled:hover:bg-success active:brightness-90 data-[animated-shine=true]:bg-shine-animated-success',
        warning:
          'bg-warning text-warning-foreground hover:brightness-110 disabled:hover:bg-warning active:brightness-90 data-[animated-shine=true]:bg-shine-animated-warning',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:hover:bg-background active:bg-accent/80 ',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/60 disabled:hover:bg-secondary active:bg-secondary/90 data-[animated-shine=true]:bg-shine-animated-secondary',
        ghost:
          'hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent active:bg-muted-foreground/10 ',
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
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isAnimatedShine?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      isAnimatedShine = false,
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
        ref={ref}
        disabled={disabled ?? isLoading}
        data-animated-shine={isAnimatedShine}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
