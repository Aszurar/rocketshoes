import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CircleMinus } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { IShoes } from '@/data/shoes'
import { cn } from '@/lib/utils'
import { getAmount } from '@/services/requests/get-amount'
import { useAppDispatch } from '@/store'
import { addProduct, removeProduct, useCurrentShoes } from '@/store/slices/cart'

import { Button } from './ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'

type ShoesProps = React.HTMLAttributes<HTMLDivElement> & {
  shoes: IShoes
  aspectRatio?: 'portrait' | 'square'
}

export function ShoesCard({
  shoes,
  aspectRatio = 'portrait',
  className,
  ...props
}: ShoesProps) {
  const [parent] = useAutoAnimate()
  const dispatch = useAppDispatch()
  const { shoesOnCart } = useCurrentShoes({ id: shoes.id })

  const aspectRatioToTailwindCSS =
    aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'

  const [amount, setAmount] = useState(0)
  const [isGetAmountLoading, setIsGetAmountLoading] = useState(false)

  const hasStockAmount = shoesOnCart ? shoesOnCart.amount < amount : true

  function handleAddProductOnCart() {
    dispatch(addProduct({ ...shoes, stockAmount: amount }))
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

      setAmount(stock.amount)
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
    <div
      className={cn(
        'flex h-[440px] flex-col space-y-3 rounded-md border border-border p-4',
        className,
      )}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <img
              src={shoes.image}
              alt={shoes.title}
              width={250}
              height={330}
              className={cn(
                'h-auto w-auto object-cover transition-all hover:scale-105',
                aspectRatioToTailwindCSS,
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleAddProductOnCart}>
            Adicionar ao Carrinho
          </ContextMenuItem>
          <ContextMenuItem>Comprar com 1 clique</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="flex flex-1 flex-col justify-between">
        <section className="space-y-1">
          <h3 className="font-medium leading-none">{shoes.title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{shoes.price}</p>

            {!!shoesOnCart && !isGetAmountLoading && (
              <div className="text-xs font-bold text-muted-foreground">
                <span className="text-primary">x{shoesOnCart.amount}</span>/
                <strong>{amount}</strong>
              </div>
            )}
          </div>
        </section>

        <div ref={parent} className="flex items-center justify-center gap-5">
          <Button
            size="sm"
            type="button"
            variant="outline"
            className="self-center"
            disabled={!hasStockAmount}
            isLoading={isGetAmountLoading}
            onClick={handleAddProductOnCart}
          >
            Adicionar ao Carrinho
          </Button>

          {!!shoesOnCart && !isGetAmountLoading && (
            <Button
              size="2xs"
              type="button"
              variant="destructive"
              className="self-center"
              onClick={handleRemoveProductOnCart}
            >
              <CircleMinus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export const ShoesCardMemoized = memo(ShoesCard, (prevProps, nextProps) => {
  return prevProps.shoes.id === nextProps.shoes.id
})
