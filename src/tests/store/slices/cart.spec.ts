import { beforeEach, describe, expect, it, vi } from 'vitest'

import { IProduct } from '@/data/shoes'
import {
  addProduct,
  cart as reducer,
  clearCart,
  deleteProductById,
  removeProduct,
  useCalculateItemsCartTotal,
} from '@/store/slices/cart'

// Mock das funções de storage
vi.mock('@/storage/cart/save-cart-storage', () => ({
  saveCartToStorage: vi.fn(),
}))

vi.mock('@/storage/cart/get-cart-storage', () => ({
  getCartFromStorage: vi.fn(() => null),
}))

vi.mock('@/storage/cart/clear-cart-storage', () => ({
  clearCartFromStorage: vi.fn(),
}))

vi.mock('@/store', () => ({
  RootState: {},
  useAppSelector: vi.fn(),
}))

const cartMockState = [
  {
    id: 1,
    price: 240,
    amount: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Nike Air Max 30',
  },
  {
    id: 2,
    price: 670,
    amount: 3,
    image: 'https://via.placeholder.com/150',
    title: 'Nike Air Max 60',
  },
  {
    id: 3,
    price: 340,
    amount: 4,
    image: 'https://via.placeholder.com/150',
    title: 'Nike Air Max 90',
  },
] as IProduct[]

const stockAmountMockState = [
  {
    id: 1,
    stockAmount: 5,
  },
  {
    id: 2,
    stockAmount: 3,
  },
  {
    id: 3,
    stockAmount: 2,
  },
]

const EMPTY = 0

describe('cart slice', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should be able add product to cart', () => {
    const firstProduct = cartMockState[0]
    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )

    const stockAmount = firstProductStock?.stockAmount ?? EMPTY

    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    expect(state).toHaveLength(1)
    expect(state).toEqual([
      {
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        amount: 1,
      } as IProduct,
    ])
  })

  it('should be able not add product to cart if stock is empty', () => {
    const firstProduct = cartMockState[0]

    const stockAmount = EMPTY

    // Add product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    expect(state).toHaveLength(0)
    expect(state).toEqual([])
  })

  it('should be able increase amount of product in cart', () => {
    const firstProduct = cartMockState[0]
    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )

    const stockAmount = firstProductStock?.stockAmount ?? EMPTY

    // Add product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    // Add product to cart again
    const stateAfterAdd = reducer(
      state,
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    expect(stateAfterAdd).toHaveLength(1)
    expect(stateAfterAdd).toEqual([
      {
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        amount: 2,
      } as IProduct,
    ])
  })

  it('should be able to add multiple products to cart', () => {
    const firstProduct = cartMockState[0]
    const secondProduct = cartMockState[1]
    const thirdProduct = cartMockState[2]

    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )
    const secondProductStock = stockAmountMockState.find(
      (item) => item.id === secondProduct.id,
    )
    const thirdProductStock = stockAmountMockState.find(
      (item) => item.id === thirdProduct.id,
    )

    const firstProductStockAmount = firstProductStock?.stockAmount ?? EMPTY
    const secondProductStockAmount = secondProductStock?.stockAmount ?? EMPTY
    const thirdProductStockAmount = thirdProductStock?.stockAmount ?? EMPTY

    // Add first product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: firstProductStockAmount,
      }),
    )

    // Add second product to cart
    const stateAfterAddSecondProduct = reducer(
      state,
      addProduct({
        id: secondProduct.id,
        image: secondProduct.image,
        price: secondProduct.price,
        title: secondProduct.title,
        stockAmount: secondProductStockAmount,
      }),
    )

    // Add third product to cart
    const stateAfterAddThirdProduct = reducer(
      stateAfterAddSecondProduct,
      addProduct({
        id: thirdProduct.id,
        image: thirdProduct.image,
        price: thirdProduct.price,
        title: thirdProduct.title,
        stockAmount: thirdProductStockAmount,
      }),
    )

    expect(stateAfterAddThirdProduct).toHaveLength(3)
    expect(stateAfterAddThirdProduct).toEqual([
      {
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        amount: 1,
      } as IProduct,
      {
        id: secondProduct.id,
        image: secondProduct.image,
        price: secondProduct.price,
        title: secondProduct.title,
        amount: 1,
      } as IProduct,
      {
        id: thirdProduct.id,
        image: thirdProduct.image,
        price: thirdProduct.price,
        title: thirdProduct.title,
        amount: 1,
      } as IProduct,
    ])
  })

  it('should be able remove product to cart', () => {
    const firstProduct = cartMockState[0]
    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )

    const stockAmount = firstProductStock?.stockAmount ?? EMPTY

    // Add product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    // Remove product from cart
    const stateAfterRemove = reducer(
      state,
      removeProduct({
        id: firstProduct.id,
      }),
    )

    expect(stateAfterRemove).toHaveLength(0)
    expect(stateAfterRemove).toEqual([])
  })

  it('should be able decrease amount of product in cart', () => {
    const firstProduct = cartMockState[0]
    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )

    const stockAmount = firstProductStock?.stockAmount ?? EMPTY

    // Add product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    // Add product to cart again
    const stateAfterAdd = reducer(
      state,
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    // Remove product from cart
    const stateAfterRemove = reducer(
      stateAfterAdd,
      removeProduct({
        id: firstProduct.id,
      }),
    )

    expect(stateAfterRemove).toHaveLength(1)
    expect(stateAfterRemove).toEqual([
      {
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        amount: 1,
      } as IProduct,
    ])
  })

  it('should be able delete product from cart independently of amount', () => {
    const firstProduct = cartMockState[0]
    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )

    const stockAmount = firstProductStock?.stockAmount ?? EMPTY

    // Add product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    // Add product to cart again
    const stateAfterAdd = reducer(
      state,
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    // Delete product from cart
    const stateAfterDelete = reducer(
      stateAfterAdd,
      deleteProductById({
        id: firstProduct.id,
      }),
    )

    expect(stateAfterDelete).toHaveLength(0)
    expect(stateAfterDelete).toEqual([])
  })

  it('should be able clear cart', () => {
    const firstProduct = cartMockState[0]
    const secondProduct = cartMockState[1]
    const thirdProduct = cartMockState[2]

    const firstProductStock = stockAmountMockState.find(
      (item) => item.id === firstProduct.id,
    )
    const secondProductStock = stockAmountMockState.find(
      (item) => item.id === secondProduct.id,
    )
    const thirdProductStock = stockAmountMockState.find(
      (item) => item.id === thirdProduct.id,
    )

    const firstProductStockAmount = firstProductStock?.stockAmount ?? EMPTY
    const secondProductStockAmount = secondProductStock?.stockAmount ?? EMPTY
    const thirdProductStockAmount = thirdProductStock?.stockAmount ?? EMPTY

    // Add first product to cart
    const state = reducer(
      [] as IProduct[],
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: firstProductStockAmount,
      }),
    )

    // Add second product to cart
    const stateAfterAddSecondProduct = reducer(
      state,
      addProduct({
        id: secondProduct.id,
        image: secondProduct.image,
        price: secondProduct.price,
        title: secondProduct.title,
        stockAmount: secondProductStockAmount,
      }),
    )

    // Add third product to cart
    const stateAfterAddThirdProduct = reducer(
      stateAfterAddSecondProduct,
      addProduct({
        id: thirdProduct.id,
        image: thirdProduct.image,
        price: thirdProduct.price,
        title: thirdProduct.title,
        stockAmount: thirdProductStockAmount,
      }),
    )

    // Clear cart
    const stateAfterClear = reducer(stateAfterAddThirdProduct, clearCart())

    expect(stateAfterClear).toHaveLength(0)
    expect(stateAfterClear).toEqual([])
  })

  it('should not exceed stock amount when adding multiple times', () => {
    const firstProduct = cartMockState[0]
    // Definir um estoque mais baixo para testar a limitação
    const stockAmount = 3

    // Estado inicial com 2 produtos
    const initialState = [
      {
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        amount: 2,
      },
    ] as IProduct[]

    // Adicionar + 1 (deve funcionar)
    const stateAfterFirstAdd = reducer(
      initialState,
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    expect(stateAfterFirstAdd[0].amount).toBe(3)

    // Tentar adicionar mais um (não deve alterar a quantidade)
    const stateAfterSecondAdd = reducer(
      stateAfterFirstAdd,
      addProduct({
        id: firstProduct.id,
        image: firstProduct.image,
        price: firstProduct.price,
        title: firstProduct.title,
        stockAmount: stockAmount,
      }),
    )

    expect(stateAfterSecondAdd[0].amount).toBe(3) // Permanece igual ao estoque máximo
  })

  it('should do nothing when trying to remove a product that does not exist', () => {
    const nonExistentProductId = 999

    // Estado inicial com um produto
    const initialState = [cartMockState[0]]

    const state = reducer(
      initialState,
      removeProduct({
        id: nonExistentProductId,
      }),
    )

    // Estado deve permanecer inalterado
    expect(state).toEqual(initialState)
    expect(state).toHaveLength(1)
  })

  it('should do nothing when trying to delete a product that does not exist', () => {
    const nonExistentProductId = 999

    // Estado inicial com um produto
    const initialState = [cartMockState[0]]

    const state = reducer(
      initialState,
      deleteProductById({
        id: nonExistentProductId,
      }),
    )

    // Estado deve permanecer inalterado
    expect(state).toEqual(initialState)
    expect(state).toHaveLength(1)
  })

  it('should handle empty initial state correctly', () => {
    // Testar com estado inicial vazio
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' })

    // Deve retornar o estado inicial (array vazio)
    expect(state).toEqual([])
  })

  it('should calculate total price and items correctly', () => {
    // Mock dos produtos no carrinho
    const cartItems = [
      {
        id: 1,
        price: 100,
        amount: 2,
        image: 'image1.jpg',
        title: 'Product 1',
      },
      {
        id: 2,
        price: 50,
        amount: 3,
        image: 'image2.jpg',
        title: 'Product 2',
      },
    ] as IProduct[]

    // Usar a função useCalculateItemsCartTotal
    const result = useCalculateItemsCartTotal(cartItems)

    // Verificar se o cálculo está correto
    // 2 * 100 + 3 * 50 = 350
    expect(result.totalPrice).toBe(350)
    // 2 + 3 = 5
    expect(result.totalItems).toBe(5)
  })
})
