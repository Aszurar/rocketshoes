import { CART_COLLECTION } from '../storage-config'

function clearCartFromStorage() {
  localStorage.removeItem(CART_COLLECTION)
}

export { clearCartFromStorage }
