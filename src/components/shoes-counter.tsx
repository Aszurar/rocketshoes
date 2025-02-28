import { MinusCircle, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { IProduct } from '@/data/shoes'
import { getAmount } from '@/services/requests/get-amount'
import { useAppDispatch } from '@/store'
import { addProduct, removeProduct } from '@/store/slices/cart'
import { LABELS } from '@/utils/labels'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

type ShoesCardCartProps = {
  shoes: IProduct
  onUpdateStockAmount?: (stock: number) => void
}

export function ShoesCounter({
  shoes,
  onUpdateStockAmount,
}: Readonly<ShoesCardCartProps>) {
  const [stockAmount, setStockAmount] = useState(0)

  const [isGetAmountLoading, setIsGetAmountLoading] = useState(false)

  const hasStockAmount = shoes ? shoes.amount < stockAmount : true

  const dispatch = useAppDispatch()

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
      if (onUpdateStockAmount) {
        onUpdateStockAmount(stock.amount)
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao buscar a quantidade do produto')
    } finally {
      setIsGetAmountLoading(false)
    }
  }

  useEffect(() => {
    onGetAmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isGetAmountLoading) {
    return <Skeleton className="h-8 w-24" />
  }
  const buttonLabelTitle = hasStockAmount
    ? LABELS.CART.ADD
    : LABELS.CART.LIMIT_REACHED

  return (
    <div className="flex">
      <Button
        type="button"
        size="xs"
        variant="ghost"
        className="h-8 w-10 p-0"
        disabled={!hasStockAmount}
        onClick={handleAddProductOnCart}
        aria-label={buttonLabelTitle}
        title={buttonLabelTitle}
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
        aria-label={LABELS.CART.REMOVE}
        title={LABELS.CART.REMOVE}
      >
        <MinusCircle className="h-4 w-4" />
      </Button>
    </div>
  )
}
