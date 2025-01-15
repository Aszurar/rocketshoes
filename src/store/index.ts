import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { cart } from './slices/cart'

export const store = configureStore({
  reducer: {
    cart,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = () => store.dispatch
