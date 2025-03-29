import { cva, type VariantProps } from 'class-variance-authority'

// Definição das variantes
const imageContainer = cva('flex flex-shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      xs: 'h-12 w-12',
      sm: 'h-16 w-16',
      md: 'h-20 w-20',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

// Precisamos do sizes para definir repassar
// o tamanho da imagem para a tag img
const sizes = {
  xs: 48,
  sm: 64,
  md: 80,
} as const

type ImageContainerProps = VariantProps<typeof imageContainer>

type ShoesCardImageProps = ImageContainerProps & {
  image: string
  title: string
}

export function ShoesCardImage({
  image,
  title,
  size,
}: Readonly<ShoesCardImageProps>) {
  // Garantindo que size seja uma chave válida para sizes
  const sizeKey = size ?? 'sm'
  const imageSize = sizes[sizeKey]

  return (
    <div className={imageContainer({ size })}>
      <img
        src={image}
        alt={title}
        width={imageSize}
        height={imageSize}
        className="h-full w-full rounded-full border-2 border-primary object-cover p-1"
      />
    </div>
  )
}
