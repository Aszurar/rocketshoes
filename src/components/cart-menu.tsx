import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '@/store'
import { clearCart, useCalculateItemsCartTotal } from '@/store/slices/cart'
import { DELIVERY_COST, monetaryValueFormatter } from '@/utils/monetary'

import { NotificationBadge } from './notification-badge'
import { ShoesCardCartMemoized } from './shoes-card-cart'
import { Tooltip } from './tooltip'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export default function CartMenu() {
  const [parent] = useAutoAnimate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const { totalItems, totalPrice } = useCalculateItemsCartTotal(cart)
  const totalPriceWithDeliveryCost = totalPrice + DELIVERY_COST

  const totalPriceFormatted = monetaryValueFormatter(totalPrice)
  const deliveredCostFormatted = monetaryValueFormatter(DELIVERY_COST)
  const totalPriceWithDeliveryCostFormatted = monetaryValueFormatter(
    totalPriceWithDeliveryCost,
  )

  const isEmptyCart = cart.length === 0

  function handleClearCart() {
    dispatch(clearCart())
  }

  function handleFinishPurchase() {
    toast.success('Compra finalizada com sucesso!')
  }

  return (
    <Sheet>
      <NotificationBadge content={totalItems}>
        <Tooltip content="Abrir o carrinho">
          <SheetTrigger asChild>
            <Button size="sm">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </Tooltip>
      </NotificationBadge>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Produtos selecionados</SheetTitle>
        </SheetHeader>

        <SheetDescription>
          Gerencie os produtos que você deseja comprar.
        </SheetDescription>

        <section ref={parent} className="mt-4 flex flex-col gap-3">
          {cart.map((shoes) => (
            <ShoesCardCartMemoized key={shoes.id} shoes={shoes} />
          ))}

          {isEmptyCart && (
            <div className="flex flex-col items-center justify-center gap-2">
              <ShoppingCart className="h-20 w-20 text-muted-foreground" />
              <p className="font-medium text-muted-foreground">
                Seu carrinho está vazio.
              </p>
            </div>
          )}
        </section>

        <SheetFooter className="mt-5 flex flex-1 gap-5 sm:flex-col sm:space-x-0">
          <section
            data-empty={isEmptyCart}
            className="flex flex-col gap-3 data-[empty=true]:opacity-70"
          >
            <div className="flex justify-between gap-3 text-sm">
              <h2 className="font-medium">Total de itens</h2>
              <span>{totalPriceFormatted}</span>
            </div>

            <div className="flex justify-between gap-3 text-sm text-muted-foreground">
              <h2 className="font-medium">Entrega</h2>
              <span>{deliveredCostFormatted}</span>
            </div>

            <div className="flex justify-between gap-3 text-sm">
              <h2 className="text-lg font-bold">Total a pagar</h2>
              <span className="text-lg font-bold">
                {totalPriceWithDeliveryCostFormatted}
              </span>
            </div>
          </section>

          <Button
            type="button"
            className="w-full"
            disabled={isEmptyCart}
            onClick={handleFinishPurchase}
          >
            Finalizar compra
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isEmptyCart}
            onClick={handleClearCart}
          >
            Limpar comprando
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
