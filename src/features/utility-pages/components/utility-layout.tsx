import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  GlassBlob,
  GlassBlob1,
  GlassBlob2,
  LogoDarkRow,
  LogoLightRow,
} from '../../../assets'

interface UtilityLayoutProps {
  children: ReactNode
}

/** Shared backdrop + logo header for the 404 / 500 / maintenance pages */
function UtilityLayout({ children }: UtilityLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Decorative blobs behind the glass */}
      <img
        src={GlassBlob1}
        alt=""
        className="pointer-events-none fixed -top-32 -left-32 -z-10 size-128 opacity-60 dark:opacity-25"
      />
      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none fixed top-1/4 right-1/4 -z-10 size-112 opacity-40 dark:opacity-20"
      />
      <img
        src={GlassBlob2}
        alt=""
        className="pointer-events-none fixed -right-24 -bottom-32 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      {/* Subtle grid, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[56px_56px] opacity-50 mask-[radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />

      <header className="mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <Link to="/" aria-label="Home">
          <img src={LogoLightRow} alt="" className="w-32.5 dark:hidden" />
          <img src={LogoDarkRow} alt="" className="hidden w-32.5 dark:block" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pb-16">
        {children}
      </main>
    </div>
  )
}

export default UtilityLayout
