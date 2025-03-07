import { toast } from 'react-toastify'

import { CART_COLLECTION } from '../storage-config'

function clearCartFromStorage() {
  try {
    localStorage.removeItem(CART_COLLECTION)
  } catch (error) {
    console.error('Erro ao limpar carrinho', error)
    toast.error('Erro ao limpar carrinho')
  }
}

export { clearCartFromStorage }
