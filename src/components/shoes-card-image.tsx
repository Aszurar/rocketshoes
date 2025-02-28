import { cn } from '@/lib/utils'

const sizes = {
  sm: 48,
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
    <div className="min-w-12 overflow-hidden rounded-full">
      <img
        src={image}
        alt={title}
        width={imageSize}
        height={imageSize}
        className={cn(
          'min-w-12 rounded-full border-2 border-primary object-cover p-1',
        )}
      />
    </div>
  )
}
