import { useState } from 'react'

import { IShoes } from '@/data/shoes'
import { cn } from '@/lib/utils'

import { Skeleton } from '../ui/skeleton'
import { EmptyImage } from './empty'

export type AspectRatioToTailwindType = 'aspect-[3/4]' | 'aspect-square'

type ShoesImageProps = {
  shoes: IShoes
  aspectRatioToTailwindCSS: AspectRatioToTailwindType
}
export function ShoesImage({
  shoes,
  aspectRatioToTailwindCSS,
}: Readonly<ShoesImageProps>) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  function handleLoad() {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div className="overflow-hidden rounded-md">
      {isLoading && (
        <Skeleton
          className={cn(
            'mb-auto h-full w-full rounded-md',
            aspectRatioToTailwindCSS,
          )}
        />
      )}

      {error && (
        <EmptyImage aspectRatioToTailwindCSS={aspectRatioToTailwindCSS} />
      )}

      {!error && (
        <img
          src={shoes.image}
          alt={shoes.title}
          width={250}
          height={330}
          // loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'h-full w-full object-cover transition-all duration-300 hover:scale-105',
            aspectRatioToTailwindCSS,
          )}
          style={{
            opacity: isLoading ? 0 : 1,
          }}
        />
      )}
    </div>
  )
}
