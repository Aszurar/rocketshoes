import { useAutoAnimate } from '@formkit/auto-animate/react'
import { HTMLAttributes, memo } from 'react'

import { IProduct } from '@/data/shoes'
import { useStockStatus } from '@/hooks/useStockStatus'
import { monetaryValueFormatter } from '@/utils/monetary'

import { CustomAlert } from './custom-alert'
import { ShoesCardImage } from './shoes-card-image'
import { ShoesCounter } from './shoes-counter'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'

type ShoesCardCartProps = HTMLAttributes<HTMLDivElement> & {
  shoes: IProduct
}

export function ShoesCardCart({
  shoes,
  ...rest
}: Readonly<ShoesCardCartProps>) {
  const [parent] = useAutoAnimate()
  const priceFormatted = monetaryValueFormatter(shoes.price)

  const { hasReachedLimitStock } = useStockStatus({
    shoes,
    cartQuantity: shoes.amount,
  })

  return (
    <Card
      className="relative flex h-27.5 w-77.5 items-center justify-between sm:w-[420px]"
      {...rest}
      data-testid="shoes-card-cart"
    >
      <CardHeader className="flex flex-row items-center justify-center gap-2 p-3 pr-1">
        <ShoesCardImage image={shoes.image} title={shoes.title} size="sm" />
        <div ref={parent} className="space-y-1">
          <CardTitle className="line-clamp-3 text-sm sm:line-clamp-2">
            {shoes.title}
          </CardTitle>
          {hasReachedLimitStock && <CustomAlert title="Limite atingido" />}
        </div>
      </CardHeader>
      <CardFooter ref={parent} className="flex min-w-fit flex-col gap-1 p-1">
        <p className="text-center text-sm font-semibold" data-testid="price">
          {priceFormatted}
        </p>
        <ShoesCounter shoesOnCart={shoes} isDeleteButtonVisible />
      </CardFooter>
    </Card>
  )
}

export const ShoesCardCartMemoized = memo(
  ShoesCardCart,
  (prevProps, nextProps) => {
    return (
      prevProps.shoes.id === nextProps.shoes.id &&
      prevProps.shoes.amount === nextProps.shoes.amount
    )
  },
)
