import { cn } from '@/lib/utils'

const sizes = {
  xs: 48,
  sm: 64,
  md: 80,
} as const

type SizesType = keyof typeof sizes

type ShoesCardImageProps = {
  image: string
  title: string
  size?: SizesType
}

export function ShoesCardImage({
  image,
  title,
  size = 'sm',
}: Readonly<ShoesCardImageProps>) {
  const imageSize = sizes[size]
  return (
    <div
      className={`min-h-[${imageSize}px] min-w-[${imageSize}px] flex flex-shrink-0 overflow-hidden rounded-full`}
    >
      <img
        src={image}
        alt={title}
        width={imageSize}
        height={imageSize}
        className={cn(
          'rounded-full border-2 border-primary object-contain p-1',
          `min-h-[${imageSize}px] min-w-[${imageSize}px] flex flex-shrink-0`,
        )}
      />
    </div>
  )
}
