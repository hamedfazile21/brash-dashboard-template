import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Check, Copy, House, RotateCw, ServerCrash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GlassBlob, GlassBlob1, GlassBlob2 } from '../../../assets'

function InternalServerError() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  // Generated once per mount so the user can quote it to support
  const [requestId] = useState(() =>
    Math.random().toString(36).slice(2, 10).toUpperCase(),
  )
  const [timestamp] = useState(() => new Date().toLocaleString())

  const details = [
    { label: 'Status', value: '500 Internal Server Error' },
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

      {/* 500 with a pulsing glass badge */}
      <div className="relative select-none" dir="ltr">
        <h1 className="bg-linear-to-b from-foreground to-foreground/10 bg-clip-text text-[9rem] leading-none font-black tracking-tighter text-transparent sm:text-[12rem]">
          500
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-ping rounded-full bg-danger/20" />
          <div className="glass relative flex size-20 items-center justify-center rounded-full sm:size-24">
            <ServerCrash
              className="size-10 text-danger sm:size-12"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          {t('Internal server error')}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t(
            "Something went wrong on our end. We're working to fix it — please try again in a moment.",
          )}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn btn-secondary flex items-center gap-x-2"
        >
          <RotateCw size={16} />
          {t('Try again')}
        </button>
        <Link to="/" className="btn btn-primary flex items-center gap-x-2">
          <House size={16} />
          {t('Back to dashboard')}
        </Link>
      </div>

      {/* Error details for support */}
      <div className="card mt-12 w-full max-w-xl p-5!">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {t('Error details')}
          </p>
          <button
            type="button"
            onClick={copyDetails}
            className="flex items-center gap-x-1.5 text-xs font-medium text-muted transition-colors hover:text-primary"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? t('Copied') : t('Copy')}
          </button>
        </div>
        <dl className="divide-y divide-borderColor text-sm">
          {details.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <dt className="text-muted">{t(label)}</dt>
              <dd className="font-mono text-foreground" dir="ltr">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted">
          {t('If the problem persists, share these details with support.')}
        </p>
      </div>
    </div>
  )
}

export default InternalServerError
