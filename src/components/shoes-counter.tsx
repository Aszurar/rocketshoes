import { MinusCircle, PlusCircle } from 'lucide-react'

import { IProduct } from '@/data/shoes'
import { useStockStatus } from '@/hooks/useStockStatus'
import { useAppDispatch } from '@/store'
import { addProduct, removeProduct } from '@/store/slices/cart'
import { LABELS } from '@/utils/labels'

import { CustomAlert } from './custom-alert'
import { DeleteItemCell } from './tables/columns/delete-item-cell'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Skeleton } from './ui/skeleton'

type ShoesCardCartProps = {
  shoesOnCart: IProduct
  isDeleteButtonVisible?: boolean
}

export function ShoesCounter({
  shoesOnCart,
  isDeleteButtonVisible = false,
}: Readonly<ShoesCardCartProps>) {
  const dispatch = useAppDispatch()

  const {
    stock,
    isStockError,
    isStockPending,
    canAddMoreInCart,
    stockAlertContent,
  } = useStockStatus({
    shoes: shoesOnCart,
    cartQuantity: shoesOnCart.amount,
  })

  function handleAddProductOnCart() {
    dispatch(
      addProduct({
        ...shoesOnCart,
        stockAmount: stock.amount,
      }),
    )
  }

  function handleRemoveProductOnCart() {
    dispatch(removeProduct({ id: shoesOnCart.id }))
  }

  if (isStockPending) {
    return <Skeleton className="h-8 w-24" />
  }

  const buttonLabelTitle = canAddMoreInCart
    ? LABELS.CART.ADD
    : LABELS.CART.LIMIT_REACHED

  if (isStockError) {
    return (
      <div className="flex gap-1">
        <CustomAlert
          title={stockAlertContent.title}
          description={stockAlertContent.description}
        />
        {isDeleteButtonVisible && <DeleteItemCell shoesId={shoesOnCart.id} />}
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <Button
        type="button"
        size="xs"
        variant="ghost"
        className="h-8 w-10 p-0"
        disabled={!canAddMoreInCart}
        onClick={handleAddProductOnCart}
        aria-label={buttonLabelTitle}
        title={buttonLabelTitle}
      >
        <PlusCircle className="h-4 w-4" />
      </Button>
      <Input
        readOnly
        value={shoesOnCart.amount}
        className="h-8 max-w-11 px-2 py-1 text-center"
        disabled={!canAddMoreInCart}
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
