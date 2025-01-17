import { IProduct } from '@/data/shoes'

import { CART_COLLECTION } from '../storage-config'

function saveCartToStorage(cart: IProduct[]) {
  const cartsStorageWithNewProduct = JSON.stringify(cart)

  localStorage.setItem(CART_COLLECTION, cartsStorageWithNewProduct)
}

export { saveCartToStorage }
