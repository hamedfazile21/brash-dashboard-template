import Header from '#/components/layout/header'
import Sidebar from '#/components/layout/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div className="flex min-h-screen items-start">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
