import { ShoppingCart } from 'lucide-react'
import { useCallback, useState } from 'react'

import { IProduct } from '@/data/shoes'
import { useResponsiveDevice } from '@/hooks/useResponsiveDevice'
import { router } from '@/router'
import { ROUTES } from '@/router/utils'
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
import { VirtualizedList } from './virtualized-list/virtualized-list'

export default function CartMenu() {
  const dispatch = useAppDispatch()
  const isMobile = useResponsiveDevice(500)

  const cartMenuListHeight = isMobile ? '400px' : '600px'

  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false)
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

  function handleToggleCartMenu(value: boolean) {
    setIsCartMenuOpen(value)
  }

  function handleCloseCartMenu() {
    setIsCartMenuOpen(false)
  }

  function handleFinishPurchase() {
    if (isEmptyCart) return

    router.navigate(ROUTES.checkout)
    handleCloseCartMenu()
  }

  const emptyCard = useCallback(() => {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <ShoppingCart className="h-20 w-20 text-muted-foreground" />
        <p className="font-medium text-muted-foreground">
          Seu carrinho está vazio.
        </p>
      </div>
    )
  }, [])

  const emptyCardComponent = emptyCard()

  const renderShoesCart = useCallback((shoes: IProduct) => {
    return (
      <ShoesCardCartMemoized
        key={shoes.id}
        shoes={shoes}
        data-testid={`card-cart-${shoes.id}`}
      />
    )
  }, [])

  return (
    <Sheet open={isCartMenuOpen} onOpenChange={handleToggleCartMenu}>
      <NotificationBadge text={totalItems} data-testid="notification-badge">
        <Tooltip asChild content="Abrir o carrinho">
          <SheetTrigger asChild>
            <Button
              size="sm"
              type="button"
              aria-label="Abrir carrinho"
              data-testid="open-cart-button"
            >
              <ShoppingCart className="h-5 w-5 max-w-sm" />
            </Button>
          </SheetTrigger>
        </Tooltip>
      </NotificationBadge>

      <SheetContent
        className="w-full max-w-full overflow-auto sm:max-w-[490px]"
        data-testid="cart-menu"
      >
        <SheetHeader>
          <SheetTitle className="items-center">
            Produtos selecionados{' '}
            <strong className="font-bold text-primary">{totalItems}</strong>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className="text-center sm:text-start">
          Gerencie os produtos que você deseja comprar.
        </SheetDescription>

        <VirtualizedList
          items={cart}
          gap={8}
          isMaxHeight
          height={cartMenuListHeight}
          renderItem={renderShoesCart}
          estimateSize={110}
          loadingComponent={null}
          emptyComponent={emptyCardComponent}
        />

        <SheetFooter className="mt-5 flex flex-1 gap-5 sm:flex-col sm:space-x-0">
          <section
            data-empty={isEmptyCart}
            className="flex flex-col gap-3 data-[empty=true]:opacity-70"
          >
            <div className="flex justify-between gap-3 text-sm">
              <h2 className="font-medium">Total de itens</h2>
              <span data-testid="total-price">{totalPriceFormatted}</span>
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
            isAnimatedShine
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
