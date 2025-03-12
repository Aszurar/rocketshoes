import { useAutoAnimate } from '@formkit/auto-animate/react'
import { memo, useState } from 'react'

import { IProduct } from '@/data/shoes'
import { monetaryValueFormatter } from '@/utils/monetary'

import { CustomAlert } from './custom-alert'
import { ShoesCardImage } from './shoes-card-image'
import { ShoesCounter } from './shoes-counter'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'

type ShoesCardCartProps = {
  shoes: IProduct
}

const STOCK_DEFAULT_VALUE = 1000

export function ShoesCardCart({ shoes }: Readonly<ShoesCardCartProps>) {
  const [parent] = useAutoAnimate()
  const priceFormatted = monetaryValueFormatter(shoes.price)
  const [stockAmountCard, setStockAmountCard] = useState(STOCK_DEFAULT_VALUE)

  const hasStockAmount = shoes ? shoes.amount < stockAmountCard : true

  function updateStockAmount(stock: number) {
    setStockAmountCard(stock)
  }

  return (
    <Card className="h-27.5 w-77.5 relative flex items-center justify-between sm:w-[420px]">
      <CardHeader className="flex flex-row items-center justify-center gap-2 p-3 pr-1">
        <ShoesCardImage image={shoes.image} title={shoes.title} size="sm" />
        <div ref={parent} className="space-y-1">
          <CardTitle className="line-clamp-3 text-sm sm:line-clamp-2">
            {shoes.title}
          </CardTitle>
          {!hasStockAmount && <CustomAlert title="Limite atingido" />}
        </div>
      </CardHeader>
      <CardFooter ref={parent} className="flex min-w-fit flex-col gap-1 p-1">
        <p className="text-center text-sm font-semibold">{priceFormatted}</p>

        <ShoesCounter shoes={shoes} onUpdateStockAmount={updateStockAmount} />
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
