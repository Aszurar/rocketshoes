import './theme/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './router'
import { queryClient } from './services/react-query'
import { axeAccessibilityReporter } from './utils/axeAccessibilityReporter'

if (import.meta.env.DEV) {
  axeAccessibilityReporter()
}

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | RocketShoes" />
      <ThemeProvider storageKey="rocketshoes-theme" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
