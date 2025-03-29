import { useAutoAnimate } from '@formkit/auto-animate/react'
import { toast } from 'react-toastify'

import Seo from '@/components/seo'
import { cartItemsTableColumns } from '@/components/tables/columns/cart-items-columns'
import { DataTable } from '@/components/tables/data-table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { router } from '@/router'
import { useAppDispatch, useAppSelector } from '@/store'
import { clearCart, useCalculateItemsCartTotal } from '@/store/slices/cart'
import { DELIVERY_COST, monetaryValueFormatter } from '@/utils/monetary'

export function Checkout() {
  const [parent] = useAutoAnimate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const { totalPrice } = useCalculateItemsCartTotal(cart)

  const totalPriceWithDeliveryCost = totalPrice + DELIVERY_COST

  const totalPriceFormatted = monetaryValueFormatter(totalPrice)
  const deliveredCostFormatted = monetaryValueFormatter(DELIVERY_COST)
  const totalPriceWithDeliveryCostFormatted = monetaryValueFormatter(
    totalPriceWithDeliveryCost,
  )

  const isEmptyCart = cart.length === 0

  function handleFinishOrder() {
    toast.success('Pedido finalizado com sucesso!')
    dispatch(clearCart())
    router.navigate('/')
  }

  return (
    <>
      <Seo
        title="Finalizar pedido"
        description="Finalize seu pedido e receba seus produtos em casa!"
      />
      <main ref={parent} className="container mx-auto space-y-8 py-10">
        <DataTable columns={cartItemsTableColumns} data={cart} />
        {!isEmptyCart && (
          <section data-empty={isEmptyCart} className="flex flex-col gap-3">
            <div className="flex justify-between gap-3 text-lg">
              <h2 className="font-medium">Total de itens</h2>
              <span>{totalPriceFormatted}</span>
            </div>
            <Separator />
            <div className="flex justify-between gap-3 text-lg text-muted-foreground">
              <h2 className="font-medium">Entrega</h2>
              <span>{deliveredCostFormatted}</span>
            </div>
            <Separator />
            <div className="flex justify-between gap-3 text-2xl font-bold">
              <h2>Total a pagar</h2>
              <span>{totalPriceWithDeliveryCostFormatted}</span>
            </div>

            <Button
              type="button"
              className="w-fit self-end"
              size="lg"
              disabled={isEmptyCart}
              onClick={handleFinishOrder}
              isAnimatedShine
            >
              Finalizar pedido
            </Button>
          </section>
        )}
      </main>
    </>
  )
}
