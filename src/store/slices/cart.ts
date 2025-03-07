import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { IProduct, IShoes } from '@/data/shoes'
import { clearCartFromStorage } from '@/storage/cart/clear-cart-storage'
import { getCartFromStorage } from '@/storage/cart/get-cart-storage'
import { saveCartToStorage } from '@/storage/cart/save-cart-storage'
import { RootState, useAppSelector } from '@/store'

const cartFormStorage = getCartFromStorage()
const initialState = cartFormStorage || ([] as IProduct[])

type AddProductProps = IShoes & {
  stockAmount: number
}

type RemoveProductProps = {
  id: number
}

type UpdateProductAmountProps = RemoveProductProps & {
  amount: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductProps>) => {
      const productExists = state.find(
        (product: IProduct) => product.id === action.payload.id,
      )

      if (productExists) {
        if (productExists.amount >= action.payload.stockAmount) {
          return
        }

        productExists.amount += 1
      } else {
        if (action.payload.stockAmount <= 0) {
          return
        }

        const newProduct = {
          ...action.payload,
          amount: 1,
        }

        state.push(newProduct)
      }
      saveCartToStorage(state)
    },
    removeProduct: (state, action: PayloadAction<RemoveProductProps>) => {
      const productExists = state.find(
        (product: IProduct) => product.id === action.payload.id,
      )

      if (productExists) {
        if (productExists.amount > 1) {
          productExists.amount -= 1
        } else {
          const index = state.findIndex(
            (product: IProduct) => product.id === action.payload.id,
          )
          state.splice(index, 1)
        }
      }
      saveCartToStorage(state)
    },
    removeProductById: (state, action: PayloadAction<RemoveProductProps>) => {
      const index = state.findIndex(
        (product: IProduct) => product.id === action.payload.id,
      )
      state.splice(index, 1)
      saveCartToStorage(state)
    },
    updateProductAmount: (
      state,
      action: PayloadAction<UpdateProductAmountProps>,
    ) => {
      const productExists = state.find(
        (product: IProduct) => product.id === action.payload.id,
      )

      if (productExists) {
        productExists.amount = action.payload.amount
      }
      saveCartToStorage(state)
    },
    clearCart: () => {
      clearCartFromStorage()
      return []
    },
  },
})

const cart = cartSlice.reducer
const { addProduct, removeProduct, removeProductById, clearCart } =
  cartSlice.actions

export { addProduct, cart, clearCart, removeProduct, removeProductById } // ajuste o caminho conforme sua estrutura

// ** Funções de utilidade **
// Cart Selector to get the current shoes on cart
const makeSelectShoesOnCart = (id: number) =>
  createSelector(
    [(state: RootState) => state.cart],
    (cart) => cart.find((product) => product.id === id) || null,
  )

type UseCurrentShoesProps = {
  id: number
}

/**
 * Hook para obter informações do produto atual no carrinho com base no ID fornecido.
 *
 * Utiliza um selector memoizado para buscar de forma eficiente o produto específico
 * do estado do carrinho (`state.cart`) sem causar rerenders desnecessários.
 *
 * @param {Object} params - Parâmetros do hook.
 * @param {number} params.id - O ID do produto que se deseja buscar no carrinho.
 * @returns {Object} Um objeto contendo a propriedade `shoesOnCart`, que é o produto encontrado no carrinho ou `null` caso não exista.
 */
export const useCurrentShoes = ({ id }: UseCurrentShoesProps) => {
  // Memoize the selector to avoid unnecessary re-renders
  const selectShoesOnCart = useMemo(() => makeSelectShoesOnCart(id), [id])

  const shoesOnCart = useAppSelector(selectShoesOnCart)

  return { shoesOnCart }
}

/**
 *  Hook para calcular o total de itens no carrinho.
 * @param state - Estado do carrinho
 * @returns {number}  Valor total dos produtos no carrinho
 */
export const useCalculateItemsCartTotal = (state: IProduct[]) => {
  let totalItems = 0
  const totalPrice = state.reduce((acc, product) => {
    totalItems += product.amount
    return acc + product.price * product.amount
  }, 0)

  return { totalPrice, totalItems }
}
