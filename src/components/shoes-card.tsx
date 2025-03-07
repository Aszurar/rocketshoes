import { AnimatePresence, motion } from 'framer-motion'
import { CircleMinus } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { IShoes } from '@/data/shoes'
import { cn } from '@/lib/utils'
import { getAmount } from '@/services/requests/get-amount'
import { useAppDispatch } from '@/store'
import { addProduct, removeProduct, useCurrentShoes } from '@/store/slices/cart'
import { LABELS } from '@/utils/labels'
import { monetaryValueFormatter } from '@/utils/monetary'

import { CustomAlert } from './custom-alert'
import { Tooltip } from './tooltip'
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

  const shoesPriceFormatted = monetaryValueFormatter(shoes.price)

  async function onGetAmount() {
    try {
      setIsGetAmountLoading(true)
      const stock = await getAmount(shoes.id)

      if (!stock) {
        throw new Error('Error on get amount')
      }

      setAmount(stock.amount)
    } catch (error) {
      console.error('Erro ao buscar a quantidade do produto', error)
      toast.error('Erro ao buscar a quantidade do produto')
    } finally {
      setIsGetAmountLoading(false)
    }
  }

  useEffect(() => {
    onGetAmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buttonLabelTitle = hasStockAmount
    ? LABELS.CART.ADD
    : LABELS.CART.LIMIT_REACHED

  return (
    <div
      className={cn(
        'flex max-h-[440px] flex-col space-y-3 rounded-md border border-border p-4',
        className,
      )}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger className="relative">
          <>
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
            <AnimatePresence>
              {!hasStockAmount && !isGetAmountLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-[-6px] right-0"
                >
                  <div>
                    <CustomAlert title="Limite atingido" />
                  </div>
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
        <section className="space-y-1">
          <h3 className="font-medium leading-none">{shoes.title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {shoesPriceFormatted}
            </p>

            <AnimatePresence>
              {!!shoesOnCart && !isGetAmountLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: 'spring', damping: 6, stiffness: 120 }}
                  className="text-xs font-bold text-muted-foreground"
                >
                  <span className="text-primary">x{shoesOnCart.amount}</span>/
                  <strong>{amount}</strong>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
        <div className="flex items-center justify-center gap-5">
          <AnimatePresence>
            <motion.div
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
                disabled={!hasStockAmount}
                isLoading={isGetAmountLoading}
                onClick={handleAddProductOnCart}
                title={buttonLabelTitle}
              >
                Adicionar ao Carrinho
              </Button>
            </motion.div>
            {!!shoesOnCart && !isGetAmountLoading && (
              <motion.div
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
