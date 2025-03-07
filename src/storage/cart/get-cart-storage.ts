import { toast } from 'react-toastify'

import { IProduct } from '@/data/shoes'

import { CART_COLLECTION } from '../storage-config'

function getCartFromStorage() {
  try {
    const carts = localStorage.getItem(CART_COLLECTION)
    const cartsParsed: IProduct[] = carts ? JSON.parse(carts) : []

    return cartsParsed
  } catch (error) {
    console.error('Erro ao recuperar produtos do carrinho', error)
    toast.error('Erro ao recuperar produtos do carrinho')
  }
}

export { getCartFromStorage }
