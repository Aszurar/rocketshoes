import { IShoes } from '@/data/shoes'

import { api } from '../api'

interface IGetShoesParams {
  title: string | null
}

export async function getShoes({ title }: IGetShoesParams) {
  const response = await api.get<IShoes[]>(`/products`, {
    params: {
      title_like: title,
    },
  })

  return response.data
}
