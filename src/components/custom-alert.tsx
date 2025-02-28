import { AlertCircleIcon } from 'lucide-react'

import { Alert, AlertTitle } from './ui/alert'

type CustomAlertProps = {
  title: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | null
}

export function CustomAlert({ title, size }: Readonly<CustomAlertProps>) {
  return (
    <Alert
      variant="destructive"
      className="flex w-fit items-center justify-center gap-2"
      size={size}
    >
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  )
}
