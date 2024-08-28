import { IShoes } from '@/data/shoes'

import { api } from '../api'

export async function getShoes() {
  const response = await api.get<IShoes[]>('/products')

  return response.data
}
