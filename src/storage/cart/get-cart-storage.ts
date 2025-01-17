import { IProduct } from '@/data/shoes'

import { CART_COLLECTION } from '../storage-config'

function getCartFromStorage() {
  const carts = localStorage.getItem(CART_COLLECTION)
  const cartsParsed: IProduct[] = carts ? JSON.parse(carts) : []

  return cartsParsed
}

export { getCartFromStorage }
