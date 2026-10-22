import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GlassBackdrop from '#/components/layout/glass-backdrop'
import { Avatar1, Avatar2, Avatar3, Avatar4 } from '../../../assets'
import { AuthFooter } from './auth-layout'

export interface AuthCoverContent {
  image: string
  icon: LucideIcon
  title: string
  description: string
  points?: string[]
  /** Floating chip in the artwork's top corner */
  badge?: { icon: LucideIcon; label: string }
}

/** Avatars + "trusted by" line, shared by the cover panels */
export function SocialProof({ label }: { label: string }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex -space-x-2 rtl:space-x-reverse">
        {[Avatar1, Avatar2, Avatar3, Avatar4].map((avatar) => (
          <img
            key={avatar}
            src={avatar}
            alt=""
            className="size-8 rounded-full bg-surface object-cover ring-2 ring-surface"
          />
        ))}
      </div>
      <p className="text-xs text-muted">
        <span className="font-semibold text-foreground">4,000+</span> {t(label)}
      </p>
    </div>
  )
}

interface AuthCoverLayoutProps {
  children: ReactNode
  cover: AuthCoverContent
  footer?: ReactNode
}

/** "Cover" auth pages: form on one side, framed artwork with a glass story on the other */
function AuthCoverLayout({ children, cover, footer }: AuthCoverLayoutProps) {
  const { t } = useTranslation()
  const { image, icon: Icon, title, description, points = [], badge } = cover

  return (
    <div className="relative grid min-h-screen w-full lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <GlassBackdrop />

      {/* Form side — the form renders its own AuthCard */}
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          {children}
        </main>
        <div className="px-6 pb-6">
          <AuthFooter />
        </div>
      </div>

      {/* Artwork side */}
      <aside className="hidden p-3 lg:block">
        <div className="sticky top-3 h-[calc(100vh-1.5rem)] overflow-hidden rounded-3xl">
          <img
            src={image}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/5" />

          {badge && (
            <div className="glass absolute inset-s-6 top-6 flex animate-float items-center gap-x-2 rounded-xl px-3 py-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-success/15 text-success">
                <badge.icon size={16} />
              </span>
              <span className="text-xs font-medium text-foreground">
                {t(badge.label)}
              </span>
            </div>
          )}

          <div className="glass absolute inset-x-6 bottom-6 rounded-2xl p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
              <Icon size={22} />
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {t(title)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(description)}
            </p>

            {points.length > 0 && (
              <ul className="mt-5 flex flex-col gap-y-2.5">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-x-2.5 text-sm text-foreground"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {t(point)}
                  </li>
                ))}
              </ul>
            )}

            {footer && (
              <div className="mt-5 border-t border-borderColor pt-5">
                {footer}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default AuthCoverLayout
