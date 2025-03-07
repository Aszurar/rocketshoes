import { toast } from 'react-toastify'

import { IProduct } from '@/data/shoes'

import { CART_COLLECTION } from '../storage-config'

function saveCartToStorage(cart: IProduct[]) {
  const cartsStorageWithNewProduct = JSON.stringify(cart)

  try {
    localStorage.setItem(CART_COLLECTION, cartsStorageWithNewProduct)
  } catch (error) {
    console.error('Erro ao salvar itens do carrinho', error)
    toast.error('Erro ao salvar  itens do carrinho')
  }
}

export { saveCartToStorage }
