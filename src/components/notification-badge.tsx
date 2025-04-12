import { HTMLAttributes } from 'react'

type NotificationBadgeProps = HTMLAttributes<HTMLDivElement> & {
  text: number
}
export function NotificationBadge({
  text,
  children,
  ...rest
}: Readonly<NotificationBadgeProps>) {
  if (!text) return <>{children}</>

  return (
    <div className="relative" {...rest}>
      <span className="absolute -right-2 -top-2 flex h-5 w-5 animate-ping rounded-full bg-primary opacity-75" />
      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
        {text}
      </span>
      {children}
    </div>
  )
}
