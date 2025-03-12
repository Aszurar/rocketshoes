import { Provider as ReduxProvider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/header'
import { useTheme } from '@/hooks/useTheme'
import { store } from '@/store'

export function Layout() {
  const { theme } = useTheme()
  return (
    <div className="mx-auto min-h-screen max-w-6xl p-6 antialiased">
      <ReduxProvider store={store}>
        <ToastContainer theme={theme} />

        <Header />
        <div className="pt-8">
          <Outlet />
        </div>
      </ReduxProvider>
    </div>
  )
}
