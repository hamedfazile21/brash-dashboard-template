import type { ReactNode } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import GlassBackdrop from '#/components/layout/glass-backdrop'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import { toggleTheme } from '#/features/theme/slice/theme-slice'
import { LogoDarkRow, LogoLightRow } from '../../../assets'

export function AuthLogo() {
  const { t } = useTranslation()
  return (
    // The row logo is a square SVG with the wordmark in a thin middle band —
    // object-cover in a short box crops the empty space above and below it
    <Link to="/" aria-label={t('Home')} className="inline-block">
      <img
        src={LogoLightRow}
        alt=""
        className="h-9 w-28 object-cover dark:hidden"
      />
      <img
        src={LogoDarkRow}
        alt=""
        className="hidden h-9 w-28 object-cover dark:block"
      />
    </Link>
  )
}

/** Auth pages have no app header, so the card carries its own theme switch */
function AuthThemeToggle() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  // Re-render on theme changes; the class on <html> is the source of truth
  useAppSelector((state) => state.themeConfig.themeMode)
  const isDark = document.documentElement.classList.contains('dark')

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme(isDark ? 'light' : 'dark'))}
      aria-label={t(isDark ? 'Switch to light mode' : 'Switch to dark mode')}
      className="btn btn-secondary btn-rounded-full"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export function AuthFooter() {
  const { t } = useTranslation()

  return (
    <footer className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted">
      <span>© {new Date().getFullYear()} Brash</span>
      <a href="#" className="transition-colors hover:text-foreground">
        {t('Privacy')}
      </a>
      <a href="#" className="transition-colors hover:text-foreground">
        {t('Terms')}
      </a>
      <a href="#" className="transition-colors hover:text-foreground">
        {t('Help')}
      </a>
    </footer>
  )
}

interface AuthCardProps {
  children: ReactNode
  /** Rendered in a tinted band under the form — e.g. "No account? Sign up" */
  footer?: ReactNode
}

/**
 * The glass card every auth form sits in: logo + theme switch on top, a
 * primary glow and hairline for depth, and an optional footer band.
 * Padding scales from the user's --card-padding setting.
 */
export function AuthCard({ children, footer }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-lg">
      {/* Soft halo behind the card */}
      <div
        aria-hidden
        className="absolute -inset-x-8 -top-12 -z-10 h-48 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15"
      />

      {/* `!` — .card is unlayered CSS and would win over plain utilities */}
      <div className="card overflow-hidden rounded-3xl! p-0! shadow-[0_24px_64px_-16px_rgb(0_0_0/0.18)]! dark:shadow-[0_24px_64px_-16px_rgb(0_0_0/0.6)]!">
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
        />

        <div className="p-[calc(var(--card-padding)*1.5)] sm:p-[calc(var(--card-padding)*2.5)]">
          <div className="mb-8 flex items-center justify-between ">
            <AuthLogo />
            <AuthThemeToggle />
          </div>
          {children}
        </div>

        {footer && (
          <div className="border-t border-borderColor bg-surface-hover/30 px-6 py-4 text-center text-sm text-muted">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/** "Basic" auth pages: utility-page backdrop, centered card, footer links */
function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <GlassBackdrop />

      <main className="flex w-full flex-1 items-center justify-center px-4 py-10">
        {children}
      </main>

      <div className="px-6 pb-6">
        <AuthFooter />
      </div>
    </div>
  )
}

export default AuthLayout
