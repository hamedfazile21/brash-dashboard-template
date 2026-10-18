import { useState } from 'react'
import {
  Bell,
  Circle,
  CircleCheck,
  LoaderCircle,
  RotateCw,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import UtilityLayout from '../components/utility-layout'
import Countdown, { useNow } from '../components/countdown'
import NotifyForm from '../components/notify-form'

// Demo window: started 1h ago, back in 2h30m (relative to page load)
const WINDOW_START_OFFSET = 60 * 60 * 1000
const WINDOW_END_OFFSET = 150 * 60 * 1000

const steps = [
  'Backing up data',
  'Migrating database',
  'Deploying new services',
  'Running health checks',
]

/** Live "upgrade in progress" panel with spinning gears behind it */
function UpgradePanel({ progress }: { progress: number }) {
  const { t } = useTranslation()
  const share = 100 / steps.length

  return (
    <div className="relative w-full max-w-sm select-none" aria-hidden>
      <div className="absolute inset-8 -z-10 rounded-full bg-warning/25 blur-3xl" />

      {/* Gears */}
      <Settings
        className="absolute -top-14 -right-14 size-28 animate-[spin_12s_linear_infinite] text-warning/50"
        strokeWidth={1.25}
      />
      <Settings
        className="absolute top-8 -right-20 size-14 animate-[spin_8s_linear_infinite_reverse] text-warning/40"
        strokeWidth={1.25}
      />

      <div className="glass relative rounded-2xl p-5">
        <div className="flex items-center justify-between" dir="ltr">
          <span className="font-mono text-xs text-muted">deploy v2.4.0</span>
          <span className="font-mono text-xs font-medium text-foreground">
            {Math.floor(progress)}%
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
          <div
            className="h-full rounded-full bg-linear-to-r from-warning to-primary transition-[width] duration-1000 ease-linear rtl:bg-linear-to-l"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="mt-5 flex flex-col gap-1">
          {steps.map((step, i) => {
            const done = progress >= (i + 1) * share
            const active = !done && progress >= i * share
            return (
              <li
                key={step}
                className={`flex items-center gap-x-3 rounded-lg px-2.5 py-2 text-sm ${
                  active ? 'bg-primary/10' : ''
                }`}
              >
                {done ? (
                  <CircleCheck size={18} className="shrink-0 text-success" />
                ) : active ? (
                  <LoaderCircle
                    size={18}
                    className="shrink-0 animate-spin text-primary"
                  />
                ) : (
                  <Circle size={18} className="shrink-0 text-muted/50" />
                )}
                <span
                  className={done || active ? 'text-foreground' : 'text-muted'}
                >
                  {t(step)}
                </span>
                <span
                  className={`ms-auto font-mono text-[10px] uppercase ${
                    done
                      ? 'text-success'
                      : active
                        ? 'text-primary'
                        : 'text-muted/70'
                  }`}
                >
                  {t(done ? 'Done' : active ? 'Running' : 'Queued')}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="glass absolute -bottom-7 -left-4 flex animate-float items-center gap-x-2 rounded-xl px-3 py-2 sm:-left-10">
        <span className="flex size-7 items-center justify-center rounded-lg bg-success/15 text-success">
          <ShieldCheck size={16} />
        </span>
        <span className="text-xs font-medium text-foreground">
          {t('Your data is safe')}
        </span>
      </div>
    </div>
  )
}

function Maintenance() {
  const { t } = useTranslation()
  const [window_] = useState(() => {
    const now = Date.now()
    return { start: now - WINDOW_START_OFFSET, end: now + WINDOW_END_OFFSET }
  })
  const now = useNow()

  const progress = Math.min(
    100,
    ((now - window_.start) / (window_.end - window_.start)) * 100,
  )

  return (
    <UtilityLayout>
      <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        <div className="flex justify-center pt-10 pb-6 lg:order-last">
          <UpgradePanel progress={progress} />
        </div>

        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-x-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
            <span className="size-1.5 animate-pulse rounded-full bg-warning" />
            {t('Scheduled maintenance')}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("We'll be back soon")}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t(
              "We're upgrading our systems to serve you better. Thanks for your patience — everything will be up and running shortly.",
            )}
          </p>

          <p className="mt-8 mb-3 text-xs font-medium tracking-wider text-muted uppercase">
            {t('Estimated time remaining')}
          </p>
          <Countdown remaining={window_.end - now} />

          <div className="mt-10 w-full max-w-md text-start">
            <p className="mb-3 text-sm font-medium text-foreground">
              {t("Get notified when we're back")}
            </p>
            <NotifyForm
              icon={Bell}
              buttonLabel="Notify me"
              successMessage="We'll let you know when we're back"
            />
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 flex items-center gap-x-1.5 text-xs font-medium text-muted transition-colors hover:text-primary"
          >
            <RotateCw size={14} />
            {t('Check again')}
          </button>
        </div>
      </div>
    </UtilityLayout>
  )
}

export default Maintenance
