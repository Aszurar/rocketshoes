import { api } from '../api'

export type GetAmountResponse = {
  id: number
  amount: number
}

export async function getAmount(id: number) {
  const response = await api.get<GetAmountResponse>(`/stock/${id}`)

  return response.data
}
