export interface IProduct {
  id: number
  title: string
  price: number
  image: string
  amount: number
}

// eslint-disable-next-line prettier/prettier
export interface IShoes extends Omit<IProduct, 'amount'> { }

export interface IStock {
  id: number
  amount: number
}
