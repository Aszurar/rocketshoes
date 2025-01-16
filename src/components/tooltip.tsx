import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

type TooltipProps = {
  content: string
  asChild?: boolean
  children?: React.ReactNode
}

export function Tooltip({
  asChild = false,
  content,
  children,
}: Readonly<TooltipProps>) {
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side="top">
          <p>{content}</p>
        </TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  )
}
