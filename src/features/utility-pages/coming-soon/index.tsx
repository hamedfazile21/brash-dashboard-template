import { useState } from 'react'
import { Rocket, Send, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import UtilityLayout from '../components/utility-layout'
import Countdown, { useNow } from '../components/countdown'
import NotifyForm from '../components/notify-form'
import { Avatar1, Avatar2, Avatar3, Avatar4 } from '../../../assets'

// Demo launch date: 12 days 8 hours after page load
const LAUNCH_OFFSET = (12 * 24 + 8) * 60 * 60 * 1000

const chartBars = [40, 65, 45, 80, 55, 95, 70]

/** Browser window with a dashboard "being built" in skeleton form */
function ProductPreview() {
  const { t } = useTranslation()

  return (
    <div className="relative w-full max-w-md select-none" aria-hidden dir="ltr">
      <div className="absolute inset-8 -z-10 rounded-full bg-primary/25 blur-3xl" />

      <div className="glass overflow-hidden rounded-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-x-1.5 border-b border-borderColor px-4 py-3">
          <span className="size-2.5 rounded-full bg-danger/70" />
          <span className="size-2.5 rounded-full bg-warning/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
          <span className="mx-auto rounded-md bg-surface-hover/70 px-3 py-0.5 font-mono text-[10px] text-muted">
            brash.app/new
          </span>
        </div>

        <div className="flex gap-4 p-4">
          {/* Sidebar skeleton */}
          <div className="flex w-14 shrink-0 flex-col gap-2.5">
            <span className="h-5 w-10 rounded-md bg-primary/40" />
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-2 animate-pulse rounded-full bg-surface-hover"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <span className="h-3 w-1/2 animate-pulse rounded-full bg-surface-hover" />

            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-linear-to-br from-primary to-violet-500 p-2.5">
                <span className="block h-1.5 w-8 rounded-full bg-white/50" />
                <span className="mt-2 block h-3 w-10 rounded-full bg-white/90" />
              </div>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-borderColor bg-background/60 p-2.5"
                >
                  <span className="block h-1.5 w-8 animate-pulse rounded-full bg-surface-hover" />
                  <span className="mt-2 block h-3 w-10 animate-pulse rounded-full bg-surface-hover" />
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="flex h-28 items-end gap-1.5 rounded-lg border border-borderColor bg-background/60 p-3">
              {chartBars.map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 origin-bottom animate-grow rounded-t ${
                    i === 5 ? 'bg-primary' : 'bg-primary/25'
                  }`}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating "new feature" chip */}
      <div className="glass absolute -top-5 -right-3 flex animate-float items-center gap-x-2 rounded-xl px-3 py-2 sm:-right-8">
        <Sparkles size={16} className="text-primary" />
        <span className="text-xs font-medium text-foreground">
          {t('Smart reports')}
        </span>
        <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-white uppercase">
          {t('New')}
        </span>
      </div>

      {/* Floating launch progress */}
      <div className="glass absolute -bottom-8 -left-3 w-52 animate-float rounded-xl p-3 [animation-delay:1.5s] sm:-left-10">
        <div className="flex items-center gap-x-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Rocket size={15} />
          </span>
          <span className="text-xs font-medium text-foreground">
            {t('Launch readiness')}
          </span>
          <span className="ms-auto font-mono text-xs text-muted">86%</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-hover">
          <div className="h-full w-[86%] rounded-full bg-linear-to-r from-primary to-violet-500" />
        </div>
      </div>
    </div>
  )
}

function ComingSoon() {
  const { t } = useTranslation()
  const [launchAt] = useState(() => Date.now() + LAUNCH_OFFSET)
  const now = useNow()

  return (
    <UtilityLayout>
      <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        <div className="flex justify-center pt-6 pb-10 lg:order-last">
          <ProductPreview />
        </div>

        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-x-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles size={12} />
            {t('Launching soon')}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('Something new is')}{' '}
            <span className="block bg-linear-to-r from-primary to-violet-500 bg-clip-text pb-1 text-transparent">
              {t('on the way')}
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t(
              "We're putting the finishing touches on a faster, smarter experience. Join the waitlist and be the first to try it.",
            )}
          </p>

          <div className="mt-8">
            <Countdown remaining={launchAt - now} withDays />
          </div>

          <div className="mt-10 w-full max-w-md">
            <NotifyForm
              icon={Send}
              buttonLabel="Join waitlist"
              successMessage="You're on the waitlist!"
            />
          </div>

          <div className="mt-6 flex items-center gap-x-3">
            <div className="flex -space-x-2">
              {[Avatar1, Avatar2, Avatar3, Avatar4].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="size-9 rounded-full border-2 border-background bg-surface-hover object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">2,400+</span>{' '}
              {t('people already joined')}
            </p>
          </div>
        </div>
      </div>
    </UtilityLayout>
  )
}

export default ComingSoon
