import { cn } from '@/lib/utils'

import { AspectRatioToTailwindType } from './image'

type EmptyImageProps = {
  aspectRatioToTailwindCSS: AspectRatioToTailwindType
}

export function EmptyImage({
  aspectRatioToTailwindCSS,
}: Readonly<EmptyImageProps>) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-muted',
        aspectRatioToTailwindCSS,
      )}
    >
      <span className="text-sm text-muted-foreground">
        Imagem não disponível
      </span>
    </div>
  )
}
