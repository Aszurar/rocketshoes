import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { deleteProductById } from '@/store/slices/cart'

type DeleteItemCellProps = {
  shoesId: number
}

export function DeleteItemCell({ shoesId }: Readonly<DeleteItemCellProps>) {
  const dispatch = useAppDispatch()

  function handleRemoveProductOnCart(shoesId: number) {
    dispatch(deleteProductById({ id: shoesId }))
  }

  return (
    <Button
      type="button"
      size="xs"
      variant="ghost"
      className="h-8 w-10 items-center p-0"
      onClick={() => {
        handleRemoveProductOnCart(shoesId)
      }}
      aria-label="Remover item"
      title="Remover item"
    >
      <Trash className="h-4 w-4 fill-destructive text-destructive" />
    </Button>
  )
}
