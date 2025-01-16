import { useAutoAnimate } from '@formkit/auto-animate/react'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { IProduct } from '@/data/shoes'
import { cn } from '@/lib/utils'
import { getAmount } from '@/services/requests/get-amount'
import { useAppDispatch } from '@/store'
import { addProduct, removeProduct } from '@/store/slices/cart'
import { monetaryValueFormatter } from '@/utils/monetary'

import { Spinner } from './spinner'
import { Button } from './ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

type ShoesCardCartProps = {
  shoes: IProduct
}

export function ShoesCardCart({ shoes }: Readonly<ShoesCardCartProps>) {
  const dispatch = useAppDispatch()
  const [parent] = useAutoAnimate()
  const priceFormatted = monetaryValueFormatter(shoes.price)
  const [stockAmount, setStockAmount] = useState(0)
  const [isGetAmountLoading, setIsGetAmountLoading] = useState(false)

  const hasStockAmount = shoes ? shoes.amount < stockAmount : true

  function handleAddProductOnCart() {
    dispatch(
      addProduct({
        ...shoes,
        stockAmount,
      }),
    )
  }

  function handleRemoveProductOnCart() {
    dispatch(removeProduct({ id: shoes.id }))
  }

  async function onGetAmount() {
    try {
      setIsGetAmountLoading(true)
      const stock = await getAmount(shoes.id)

      if (!stock) {
        throw new Error('Error on get amount')
      }

      setStockAmount(stock.amount)
    } catch (error) {
      toast.error('Erro ao buscar a quantidade do produto')
    } finally {
      setIsGetAmountLoading(false)
    }
  }

  useEffect(() => {
    onGetAmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="flex items-center justify-center">
      <CardHeader className="flex flex-row items-center justify-center gap-2 p-3 pr-1">
        <div className="min-w-12 overflow-hidden rounded-full">
          <img
            src={shoes.image}
            alt={shoes.title}
            width={48}
            height={48}
            className={cn(
              'min-w-12 rounded-full border-2 border-primary object-cover p-1',
            )}
          />
        </div>
        <CardTitle className="text-sm">
          Tênis VR Caminhada Confortável Detalhes Couro Masculino
        </CardTitle>
      </CardHeader>
      <CardFooter ref={parent} className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-center text-sm font-semibold">{priceFormatted}</p>

        {isGetAmountLoading && <Spinner className="text-primary" />}
        {!isGetAmountLoading && (
          <div className="flex">
            <Button
              type="button"
              size="xs"
              variant="ghost"
              className="h-8 w-10 p-0"
              disabled={!hasStockAmount}
              onClick={handleAddProductOnCart}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Input
              readOnly
              value={shoes.amount}
              className="h-8 max-w-11 px-2 py-1 text-center"
              disabled={!hasStockAmount}
            />
            <Button
              type="button"
              size="xs"
              variant="ghost"
              className="h-8 w-10 items-center p-0"
              onClick={handleRemoveProductOnCart}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!isGetAmountLoading && !hasStockAmount && (
          <div className="flex w-full items-center justify-center">
            <strong className="text-xs font-semibold text-destructive">
              Limite atingido
            </strong>
          </div>
        )}
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
