import { IDataResponse } from '@/data/shoes'

import { api } from '../api'

export type GetAmountResponse = {
  id: number
  amount: number
}

export async function getAmount(id: number) {
  const response = await api.get<IDataResponse>('')

  const { stock: stockList } = response.data

  const stock = stockList.find((stockItem) => stockItem.id === id)

  return stock as GetAmountResponse
}
