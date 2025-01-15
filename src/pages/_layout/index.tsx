import { Provider as ReduxProvider } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'
import { store } from '@/store'

export function Layout() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl p-6">
      <ReduxProvider store={store}>
        <Header />
        <div className="pt-8">
          <Outlet />
        </div>
      </ReduxProvider>
    </div>
  )
}
