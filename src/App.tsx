import './theme/global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './router'
import { queryClient } from './services/react-query'

function App() {
  return (
    <ThemeProvider storageKey="rocketshoes-theme" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
