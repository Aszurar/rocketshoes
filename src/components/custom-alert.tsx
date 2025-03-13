import { AlertCircleIcon } from 'lucide-react'

import { Alert, AlertTitle } from './ui/alert'

type CustomAlertProps = {
  title: string
  description?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | null
}

export function CustomAlert({
  title,
  description,
  size,
}: Readonly<CustomAlertProps>) {
  return (
    <Alert
      variant="destructive"
      className="flex w-fit items-center justify-center gap-2"
      size={size}
      title={description}
    >
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  )
}
