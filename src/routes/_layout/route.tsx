import Header from '#/components/layout/header'
import Sidebar from '#/components/layout/sidebar'
import type { MainWidth } from '#/features/theme/slice/theme-types'
import { useAppSelector } from '#/hooks/redux'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const mainWidthClasses: Record<MainWidth, string> = {
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

export const Route = createFileRoute('/_layout')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  const mainWidth = useAppSelector((state) => state.themeConfig.mainWidth)

  return (
    <div className="flex min-h-screen items-start">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className={`mx-auto w-full p-6 ${mainWidthClasses[mainWidth]}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
