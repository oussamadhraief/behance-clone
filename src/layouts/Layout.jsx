import { Outlet } from 'react-router-dom'
import { Footer } from './footer'
import Header from './Header'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col w-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

