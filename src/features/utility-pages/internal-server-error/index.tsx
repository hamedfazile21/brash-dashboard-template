import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Check, Copy, House, RotateCw, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import UtilityLayout from '../components/utility-layout'

const RACK_UNITS = 4
const FAILED_UNIT = 2

/** A server rack with one unit knocked out of place, plus a live error log */
function BrokenRack() {
  return (
    <div className="relative w-full max-w-md select-none" aria-hidden dir="ltr">
      {/* Glow behind the rack */}
      <div className="absolute inset-10 -z-10 rounded-full bg-danger/20 blur-3xl" />

      <div className="glass mx-auto w-72 rounded-2xl p-4 sm:w-80">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
            rack-01
          </span>
          <span className="flex items-center gap-x-1.5 font-mono text-[10px] text-danger">
            <span className="size-1.5 animate-pulse rounded-full bg-danger" />
            degraded
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {Array.from({ length: RACK_UNITS }, (_, i) => {
            const failed = i === FAILED_UNIT
            return (
              <div
                key={i}
                className={`relative flex h-12 items-center gap-x-3 rounded-lg border px-3 ${
                  failed
                    ? 'translate-x-5 rotate-2 border-danger/40 bg-danger/10'
                    : 'border-borderColor bg-background/70'
                }`}
              >
                <div className="flex gap-x-1.5">
                  {[0, 1].map((led) => (
                    <span
                      key={led}
                      className={`size-2 rounded-full ${
                        failed
                          ? 'animate-blink bg-danger'
                          : 'animate-pulse bg-success'
                      }`}
                      style={{ animationDelay: `${(i + led) * 0.35}s` }}
                    />
                  ))}
                </div>
                <div className="flex h-5 gap-x-1">
                  {Array.from({ length: 7 }, (__, v) => (
                    <span
                      key={v}
                      className={`w-0.5 rounded-full ${failed ? 'bg-danger/30' : 'bg-borderColor'}`}
                    />
                  ))}
                </div>
                <div className="ml-auto flex flex-col gap-1">
                  <span
                    className={`h-1 w-10 rounded-full ${failed ? 'bg-danger/30' : 'bg-surface-hover'}`}
                  />
                  <span
                    className={`h-1 w-6 rounded-full ${failed ? 'bg-danger/30' : 'bg-surface-hover'}`}
                  />
                </div>

                {failed && (
                  <span className="absolute -top-3 -right-3 flex size-7 items-center justify-center rounded-full bg-danger text-white shadow-lg shadow-danger/40">
                    <Zap size={14} className="fill-white" />
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Terminal with the failing request */}
      <div className="glass animate-float absolute -bottom-16 -left-2 w-64 rounded-xl p-3 font-mono text-[11px] leading-relaxed sm:-left-8">
        <div className="mb-2 flex items-center gap-x-1.5">
          <span className="size-2 rounded-full bg-danger" />
          <span className="size-2 rounded-full bg-warning" />
          <span className="size-2 rounded-full bg-success" />
          <span className="ml-2 text-[10px] text-muted">server.log</span>
        </div>
        <p className="text-muted">› GET /api/dashboard</p>
        <p className="text-warning">› upstream timed out</p>
        <p className="text-danger">✕ 500 Internal Server Error</p>
        <p className="text-foreground">
          › retrying<span className="animate-blink">▍</span>
        </p>
      </div>
    </div>
  )
}

function InternalServerError() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [retrying, setRetrying] = useState(false)

  // Generated once per mount so the user can quote it to support
  const [requestId] = useState(() =>
    Math.random().toString(36).slice(2, 10).toUpperCase(),
  )
  const [timestamp] = useState(() =>
    new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
  )

  const details = [
    { label: 'Status', value: '500' },
    { label: 'Request ID', value: requestId },
    { label: 'Time', value: timestamp },
  ]

  const copyDetails = async () => {
    const text = details.map((d) => `${d.label}: ${d.value}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable (insecure context); nothing to do
    }
  }

  const retry = () => {
    setRetrying(true)
    window.location.reload()
  }

  return (
    <UtilityLayout>
      <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        <div className="flex justify-center pb-16 lg:order-last">
          <BrokenRack />
        </div>

        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-x-2 rounded-full border border-danger/25 bg-danger/10 px-3 py-1 text-xs font-medium text-danger">
            <span className="size-1.5 animate-pulse rounded-full bg-danger" />
            {t('Error 500')}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('Something broke on our side')}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t(
              "It's not you, it's us. Our servers hit an unexpected error — we've been notified and are already on it.",
            )}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={retry}
              disabled={retrying}
              className="btn btn-primary flex items-center gap-x-2"
            >
              <RotateCw size={18} className={retrying ? 'animate-spin' : ''} />
              {t('Try again')}
            </button>
            <Link
              to="/"
              className="btn btn-secondary flex items-center gap-x-2"
            >
              <House size={18} />
              {t('Back to dashboard')}
            </Link>
          </div>

          {/* Error details for support */}
          <div className="card mt-12 w-full max-w-lg p-0! text-start">
            <div className="flex items-center justify-between border-b border-borderColor px-4 py-3">
              <p className="text-xs font-medium tracking-wider text-muted uppercase">
                {t('Error details')}
              </p>
              <button
                type="button"
                onClick={copyDetails}
                className="flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-primary"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t('Copied') : t('Copy')}
              </button>
            </div>
            <dl className="grid grid-cols-[0.7fr_1fr_1.5fr] divide-x divide-borderColor">
              {details.map(({ label, value }) => (
                <div key={label} className="min-w-0 px-4 py-3">
                  <dt className="text-xs text-muted">{t(label)}</dt>
                  <dd
                    className="mt-1 truncate font-mono text-sm text-foreground"
                    dir="ltr"
                    title={value}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-3 text-xs text-muted">
            {t('If the problem persists, share these details with support.')}
          </p>
        </div>
      </div>
    </UtilityLayout>
  )
}

export default InternalServerError
