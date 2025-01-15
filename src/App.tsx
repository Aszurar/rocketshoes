import './theme/global.css'

import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './router'

function App() {
  return (
    <ThemeProvider storageKey="rocketshoes-theme" defaultTheme="dark">
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
