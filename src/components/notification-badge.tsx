import { ReactNode } from 'react'

type NotificationBadgeProps = {
  children: ReactNode
  content: string | number
}
export function NotificationBadge({
  children,
  content,
}: Readonly<NotificationBadgeProps>) {
  if (!content) return <>{children}</>

  return (
    <div className="relative">
      <span className="absolute -right-2 -top-2 flex h-5 w-5 animate-ping rounded-full bg-primary opacity-75" />
      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
        {content}
      </span>
      {children}
    </div>
  )
}
