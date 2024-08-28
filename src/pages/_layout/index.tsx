import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function Layout() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl p-6">
      <Header />
      <div className="pt-8">
        <Outlet />
      </div>
    </div>
  )
}
