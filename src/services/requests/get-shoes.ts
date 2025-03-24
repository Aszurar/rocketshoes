import { IDataResponse } from '@/data/shoes'

import { api } from '../api'

export async function getShoes() {
  const response = await api.get<IDataResponse>('')

  return response.data.products
}
