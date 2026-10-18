import { useEffect, useState } from 'react'
import { Bell, RotateCw, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useForm } from '@tanstack/react-form'
import Input from '#/components/input'
import { showObjectToast } from '#/helper/toast-helper'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../assets'

// Demo window: started 1h ago, back in 2h30m (relative to page load)
const WINDOW_START_OFFSET = 60 * 60 * 1000
const WINDOW_END_OFFSET = 150 * 60 * 1000

const pad = (n: number) => String(n).padStart(2, '0')

function Maintenance() {
  const { t } = useTranslation()
  const [window_] = useState(() => {
    const now = Date.now()
    return { start: now - WINDOW_START_OFFSET, end: now + WINDOW_END_OFFSET }
  })
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const remaining = Math.max(0, window_.end - now)
  const progress = Math.min(
    100,
    ((now - window_.start) / (window_.end - window_.start)) * 100,
  )
  const countdown = [
    { label: 'Hours', value: Math.floor(remaining / 3_600_000) },
    { label: 'Minutes', value: Math.floor((remaining / 60_000) % 60) },
    { label: 'Seconds', value: Math.floor((remaining / 1000) % 60) },
  ]

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      showObjectToast(t("We'll let you know when we're back"), value)
      reset()
    },
  })

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

      {/* Wrench badge with a soft warning glow */}
      <div className="relative select-none">
        <span className="absolute inset-0 rounded-full bg-warning/25 blur-2xl" />
        <div className="glass relative flex size-24 items-center justify-center rounded-full sm:size-28">
          <Wrench
            className="size-11 animate-wiggle text-warning sm:size-12"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <span className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
        <span className="size-1.5 animate-pulse rounded-full bg-warning" />
        {t('Scheduled maintenance')}
      </span>

      <div className="mt-4 max-w-md text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("We'll be back soon")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t(
            "We're upgrading our systems to serve you better. Thanks for your patience — everything will be up and running shortly.",
          )}
        </p>
      </div>

      {/* Countdown */}
      <div className="mt-8 flex items-center gap-3" dir="ltr">
        {countdown.map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="card flex w-20 flex-col items-center p-3! sm:w-24">
              <span className="font-mono text-3xl font-semibold text-foreground tabular-nums sm:text-4xl">
                {pad(value)}
              </span>
              <span className="mt-1 text-[11px] tracking-wide text-muted uppercase">
                {t(label)}
              </span>
            </div>
            {i < countdown.length - 1 && (
              <span className="text-2xl font-semibold text-muted">:</span>
            )}
          </div>
        ))}
      </div>

      {/* Status + notify */}
      <div className="card mt-10 w-full max-w-xl p-5!">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium tracking-wide text-muted uppercase">
            {t('Progress')}
          </span>
          <span className="font-mono text-foreground" dir="ltr">
            {Math.floor(progress)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-hover">
          <div
            className="h-full rounded-full bg-linear-to-r from-warning to-primary transition-[width] duration-1000 ease-linear rtl:bg-linear-to-l"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="my-5 border-t border-borderColor" />

        <p className="text-sm font-medium text-foreground">
          {t("Get notified when we're back")}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleSubmit()
          }}
          className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start"
        >
          <Field
            name="email"
            validators={{
              onSubmit: ({ value }) =>
                !value
                  ? t('Email is required')
                  : !/^\S+@\S+\.\S+$/.test(value)
                    ? t('Enter a valid email')
                    : undefined,
            }}
            children={(field) => (
              <Input
                id={field.name}
                type="email"
                placeholder={t('you@example.com')}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors.join(', ')
                    : undefined
                }
              />
            )}
          />
          <button
            type="submit"
            className="btn btn-primary flex shrink-0 items-center justify-center gap-x-2"
          >
            <Bell size={16} />
            {t('Notify me')}
          </button>
        </form>
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
  )
}

export default Maintenance
