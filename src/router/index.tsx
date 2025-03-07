import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/pages/_layout'
import { Checkout } from '@/pages/checkout'
import { Home } from '@/pages/home'

import { ROUTES } from './utils'

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      { path: ROUTES.home, element: <Home /> },
      { path: ROUTES.checkout, element: <Checkout /> },
    ],
  },
])
