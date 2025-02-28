import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip'

type TooltipProps = {
  content: string
  asChild?: boolean
  children?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  ref?: React.RefObject<HTMLButtonElement>
}

export function Tooltip({
  asChild = false,
  content,
  children,
  side = 'bottom',
  ref,
}: Readonly<TooltipProps>) {
  return (
    <TooltipUI>
      <TooltipTrigger ref={ref} asChild={asChild}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>{content}</p>
      </TooltipContent>
    </TooltipUI>
  )
}
