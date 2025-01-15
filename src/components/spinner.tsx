import { LoaderCircle } from 'lucide-react'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export function Spinner({
  className,
  size = 28,
  ...rest
}: Readonly<SpinnerProps>) {
  return (
    <div className="flex items-center justify-center" {...rest}>
      <LoaderCircle
        size={size}
        className={`animate-spin duration-700 ${className}`}
      />
    </div>
  )
}
