import './theme/global.css'

import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './router'

function App() {
  return (
    <ThemeProvider storageKey="rocketshoes-theme" defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
