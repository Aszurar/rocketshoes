import { Row } from '@tanstack/react-table'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { IProduct } from '@/data/shoes'
import { useAppDispatch } from '@/store'
import { removeProductById } from '@/store/slices/cart'

type DeleteItemCellProps = {
  row: Row<IProduct>
}

export function DeleteItemCell({ row }: Readonly<DeleteItemCellProps>) {
  const dispatch = useAppDispatch()

  function handleRemoveProductOnCart(shoesId: number) {
    dispatch(removeProductById({ id: shoesId }))
  }

  return (
    <Button
      type="button"
      size="xs"
      variant="ghost"
      className="h-8 w-10 items-center p-0"
      onClick={() => {
        handleRemoveProductOnCart(row.original.id)
      }}
      aria-label="Remover item"
      title="Remover item"
    >
      <Trash className="h-4 w-4 fill-destructive text-destructive" />
    </Button>
  )
}
