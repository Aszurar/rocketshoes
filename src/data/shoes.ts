import { GetAmountResponse } from '@/services/requests/get-amount'

export interface IProduct {
  id: number
  title: string
  price: number
  image: string
  amount: number
}

export type IShoes = Omit<IProduct, 'amount'>

export interface IStock {
  id: number
  amount: number
}

const STOCK_AMOUNT_DEFAULT: GetAmountResponse = {
  id: 0,
  amount: 0,
} as const

export interface IDataResponse {
  products: IProduct[]
  stock: IStock[]
}

export { STOCK_AMOUNT_DEFAULT }
