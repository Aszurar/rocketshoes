import { AnimatePresence, motion } from 'framer-motion'
import { CircleMinus } from 'lucide-react'
import { memo } from 'react'

import { IShoes } from '@/data/shoes'
import { useStockStatus } from '@/hooks/useStockStatus'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store'
import { addProduct, removeProduct, useCurrentShoes } from '@/store/slices/cart'
import { LABELS } from '@/utils/labels'
import { monetaryValueFormatter } from '@/utils/monetary'

import { CustomAlert } from '../custom-alert'
import { Tooltip } from '../tooltip'
import { Button } from '../ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { ShoesImage } from './image'

type AspectRatioType = 'portrait' | 'square'

type ShoesProps = React.HTMLAttributes<HTMLDivElement> & {
  shoes: IShoes
  aspectRatio?: AspectRatioType
}

export function ShoesCard({
  shoes,
  aspectRatio = 'portrait',
  className,
  ...props
}: ShoesProps) {
  const dispatch = useAppDispatch()
  const { shoesOnCart } = useCurrentShoes({ id: shoes.id })

  const {
    stock,
    isStockPending,
    isShowStockAlert,
    canAddMoreInCart,
    stockAlertContent,
  } = useStockStatus({
    shoes,
    cartQuantity: shoesOnCart?.amount,
  })
  const hasQuantityCounter = !!shoesOnCart && !isStockPending

  const aspectRatioToTailwindCSS =
    aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'

  function handleRemoveProductOnCart() {
    dispatch(removeProduct({ id: shoes.id }))
  }

  const shoesPriceFormatted = monetaryValueFormatter(shoes.price)

  const handleAddProductOnCart = function handleAddProductOnCart() {
    dispatch(addProduct({ ...shoes, stockAmount: stock.amount }))
  }

  const buttonLabelTitle = canAddMoreInCart
    ? LABELS.CART.ADD
    : LABELS.CART.LIMIT_REACHED

  return (
    <div
      className={cn(
        'flex h-110 w-64 flex-col space-y-3 rounded-md border border-border p-4',
        className,
      )}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger className="relative">
          <>
            <ShoesImage
              shoes={shoes}
              aspectRatioToTailwindCSS={aspectRatioToTailwindCSS}
            />
            <AnimatePresence mode="wait">
              {isShowStockAlert && (
                <motion.div
                  key={`stock-limit-reached-${shoes.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-[-6px] right-0"
                >
                  <CustomAlert
                    title={stockAlertContent.title}
                    description={stockAlertContent.description}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleAddProductOnCart}>
            Adicionar ao Carrinho
          </ContextMenuItem>
          <ContextMenuItem>Comprar com 1 clique</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="flex flex-1 flex-col justify-between space-y-1">
        <section className="space-y-2">
          <h2
            className="line-clamp-2 font-medium leading-none"
            title={shoes.title}
          >
            {shoes.title}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {shoesPriceFormatted}
            </p>

            <AnimatePresence>
              {hasQuantityCounter && (
                <motion.div
                  key={`amount-${shoes.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: 'spring', damping: 6, stiffness: 120 }}
                  className="text-xs font-bold text-muted-foreground"
                >
                  <span className="text-primary">x{shoesOnCart.amount}</span>/
                  <strong>{stock.amount}</strong>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        <div className="flex items-center justify-center gap-5">
          <AnimatePresence>
            <motion.div
              key={`add-to-cart-${shoes.id}`}
              layout="position"
              transition={{
                type: 'spring',
                stiffness: 700,
                damping: 30,
              }}
            >
              <Button
                size="sm"
                type="button"
                variant="outline"
                className="self-center"
                disabled={!canAddMoreInCart}
                isLoading={isStockPending}
                onClick={handleAddProductOnCart}
                title={buttonLabelTitle}
              >
                Adicionar ao Carrinho
              </Button>
            </motion.div>
            {!!shoesOnCart && !isStockPending && (
              <motion.div
                key={`remove-from-cart-${shoes.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <Tooltip asChild content="Remover do carrinho de compras">
                  <Button
                    size="2xs"
                    type="button"
                    variant="destructive"
                    className="self-center"
                    onClick={handleRemoveProductOnCart}
                    aria-label="Remover do carrinho de compras"
                    data-testid={`remove-item-card-${shoes.id}`}
                  >
                    <CircleMinus className="h-4 w-4" />
                  </Button>
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export const ShoesCardMemoized = memo(ShoesCard, (prevProps, nextProps) => {
  return prevProps.shoes.id === nextProps.shoes.id
})
