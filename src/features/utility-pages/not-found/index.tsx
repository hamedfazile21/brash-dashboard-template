import { Link, useRouter } from '@tanstack/react-router'
import {
  ArrowLeft,
  ChartPie,
  Compass,
  House,
  ListTodo,
  MessageCircle,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../assets'

const quickLinks = [
  { title: 'Dashboard', to: '/', icon: House },
  { title: 'Chat', to: '/chat', icon: MessageCircle },
  { title: 'Charts', to: '/charts', icon: ChartPie },
  { title: 'To Do List', to: '/to-do-list', icon: ListTodo },
] as const

function NotFoundPage() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Decorative blobs behind the glass */}
      <img
        src={GlassBlob1}
        alt=""
        className="pointer-events-none fixed -top-20 -left-20 -z-10 size-128 opacity-70 dark:opacity-30"
      />
      <img
        src={GlassBlob}
        alt=""
        className="pointer-events-none fixed top-1/3 left-1/2 -z-10 size-96 -translate-x-1/2 opacity-40 dark:opacity-20"
      />
      <img
        src={GlassBlob2}
        alt=""
        className="pointer-events-none fixed -right-16 -bottom-24 -z-10 size-128 opacity-60 dark:opacity-25"
      />

      {/* Subtle grid, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[48px_48px] opacity-60 mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      {/* 404 with a floating glass badge */}
      <div className="relative select-none" dir="ltr">
        <h1 className="bg-linear-to-b from-foreground to-foreground/10 bg-clip-text text-[9rem] leading-none font-black tracking-tighter text-transparent sm:text-[12rem]">
          404
        </h1>
        <div className="glass absolute top-1/2 left-[51%] flex size-20 -translate-x-1/2 -translate-y-1/2 animate-[spin_12s_linear_infinite] items-center justify-center rounded-full sm:size-24">
          <Compass className="size-10 text-primary sm:size-12" strokeWidth={1.5} />
        </div>
      </div>

      <div className="mt-6 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          {t('Page not found')}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t(
            "Looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.",
          )}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => router.history.back()}
          className="btn btn-secondary flex items-center gap-x-2"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t('Go back')}
        </button>
        <Link to="/" className="btn btn-primary flex items-center gap-x-2">
          <House size={16} />
          {t('Back to dashboard')}
        </Link>
      </div>

      {/* Helpful shortcuts */}
      <div className="card mt-12 w-full max-w-xl p-5!">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">
          {t('Or try one of these')}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {quickLinks.map(({ title, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-y-2 rounded-lg border border-transparent p-3 text-sm text-foreground transition-colors hover:border-borderColor hover:bg-surface-hover/50"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon size={18} />
              </span>
              {t(title)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
