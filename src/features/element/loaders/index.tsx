import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Gauge, LayoutList, LoaderCircle, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  FadeLoader,
  HashLoader,
  MoonLoader,
  PropagateLoader,
  RotateLoader,
  ScaleLoader,
  SyncLoader,
} from 'react-spinners'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'
import { Avatar10, Avatar11, Avatar12 } from '../../../assets'

/* ------------------------------------------------------------------ */
/* Spinners + playground                                               */
/* ------------------------------------------------------------------ */

const colors = [
  { label: 'Primary', value: 'var(--color-primary)', swatch: 'bg-primary' },
  { label: 'Success', value: 'var(--success)', swatch: 'bg-success' },
  { label: 'Warning', value: 'var(--warning)', swatch: 'bg-warning' },
  { label: 'Danger', value: 'var(--danger)', swatch: 'bg-danger' },
  { label: 'Text', value: 'var(--foreground)', swatch: 'bg-foreground' },
]

const spinners: { name: string; render: (color: string) => ReactNode }[] = [
  { name: 'Moon', render: (c) => <MoonLoader color={c} size={40} /> },
  {
    name: 'Beat',
    render: (c) => <BeatLoader color={c} size={12} margin={3} />,
  },
  { name: 'Bar', render: (c) => <BarLoader color={c} width={96} height={4} /> },
  { name: 'Bounce', render: (c) => <BounceLoader color={c} size={40} /> },
  {
    name: 'Fade',
    render: (c) => (
      <FadeLoader color={c} height={10} width={4} radius={2} margin={-10} />
    ),
  },
  { name: 'Propagate', render: (c) => <PropagateLoader color={c} size={10} /> },
  {
    name: 'Sync',
    render: (c) => <SyncLoader color={c} size={10} margin={3} />,
  },
  {
    name: 'Rotate',
    render: (c) => <RotateLoader color={c} size={10} margin={2} />,
  },
  { name: 'Scale', render: (c) => <ScaleLoader color={c} height={28} /> },
  { name: 'Hash', render: (c) => <HashLoader color={c} size={36} /> },
]

function SpinnersSection() {
  const { t } = useTranslation()
  const [color, setColor] = useState(colors[0].value)
  const [scale, setScale] = useState(1)

  return (
    <ShowcaseSection
      icon={LoaderCircle}
      title="Spinners"
      description="Ten indicators from react-spinners — tune the size and color live"
    >
      {/* Playground */}
      <div className="card flex flex-col gap-4 p-4! sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex items-center gap-x-3"
          role="radiogroup"
          aria-label={t('Color')}
        >
          <span className="text-xs font-medium text-muted">{t('Color')}</span>
          {colors.map(({ label, value, swatch }) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={color === value}
              aria-label={t(label)}
              title={t(label)}
              onClick={() => setColor(value)}
              className={`size-6 rounded-full ring-offset-2 ring-offset-background transition-transform hover:scale-110 ${swatch} ${
                color === value ? 'scale-110 ring-2 ring-foreground/40' : ''
              }`}
            />
          ))}
        </div>
        <label className="flex items-center gap-x-3 sm:w-72">
          <span className="text-xs font-medium text-muted">{t('Size')}</span>
          <input
            type="range"
            min={0.6}
            max={1.6}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="range flex-1"
            style={{
              ['--range-progress' as string]: `${((scale - 0.6) / 1) * 100}%`,
            }}
          />
          <span className="w-10 text-end font-mono text-xs text-muted tabular-nums">
            {Math.round(scale * 100)}%
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {spinners.map(({ name, render }) => (
          <div key={name} className="card flex flex-col p-0!">
            <div
              role="status"
              aria-label={t('Loading')}
              className="flex h-28 items-center justify-center overflow-hidden border-b border-borderColor bg-background/40"
            >
              {/* zoom scales the whole spinner, layout box included */}
              <div style={{ zoom: scale }}>{render(color)}</div>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-sm font-medium text-foreground">{t(name)}</p>
              <code dir="ltr" className="font-mono text-[11px] text-muted">
                {`<${name}Loader />`}
              </code>
            </div>
          </div>
        ))}
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Skeletons                                                           */
/* ------------------------------------------------------------------ */

/** Pulsing placeholder; pass a radius in `rounded` to replace the default */
function Bone({
  className = '',
  rounded = 'rounded-md',
}: {
  className?: string
  rounded?: string
}) {
  return (
    <span
      className={`block animate-pulse bg-surface-hover ${rounded} ${className}`}
    />
  )
}

const people = [
  { name: 'Sara Ahmadi', role: 'Engineering Lead', avatar: Avatar10 },
  { name: 'Kian Rostami', role: 'Frontend Developer', avatar: Avatar11 },
  { name: 'Nina Karimi', role: 'Product Manager', avatar: Avatar12 },
]

function SkeletonsSection() {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  return (
    <ShowcaseSection
      icon={LayoutList}
      title="Skeletons"
      description="Placeholders shaped like the content — less layout shift than a spinner"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setLoaded((v) => !v)}
          className="btn btn-secondary btn-sm"
        >
          <RotateCcw size={14} />
          {t(loaded ? 'Show skeleton' : 'Show content')}
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        <DemoCard title="Card" code="animate-pulse">
          <div aria-busy={!loaded} className="flex flex-col gap-y-3">
            {loaded ? (
              <>
                <div className="h-28 rounded-lg bg-linear-to-br from-primary/30 to-primary/5" />
                <p className="text-sm font-semibold text-foreground">
                  {t('Announcing the new dashboard')}
                </p>
                <p className="text-xs text-muted">
                  {t(
                    'Faster, more accessible, with full dark mode and RTL support.',
                  )}
                </p>
              </>
            ) : (
              <>
                <Bone className="h-28 w-full" rounded="rounded-lg" />
                <Bone className="h-4 w-3/4" />
                <Bone className="h-3 w-full" />
                <Bone className="h-3 w-5/6" />
              </>
            )}
          </div>
        </DemoCard>

        <DemoCard title="List" code="avatar + lines">
          <ul aria-busy={!loaded} className="flex flex-col gap-y-3.5">
            {people.map(({ name, role, avatar }) => (
              <li key={name} className="flex items-center gap-x-3">
                {loaded ? (
                  <>
                    <img
                      src={avatar}
                      alt=""
                      className="size-9 rounded-full object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">
                        {name}
                      </span>
                      <span className="block text-xs text-muted">
                        {t(role)}
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <Bone className="size-9 shrink-0" rounded="rounded-full" />
                    <span className="flex flex-1 flex-col gap-y-1.5">
                      <Bone className="h-3.5 w-1/2" />
                      <Bone className="h-3 w-1/3" />
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </DemoCard>

        <DemoCard title="Table" code="rows">
          <div
            aria-busy={!loaded}
            className="flex flex-col divide-y divide-borderColor text-sm"
          >
            {[
              ['#1024', '$240.00', 'Paid'],
              ['#1023', '$89.50', 'Pending'],
              ['#1022', '$1,200.00', 'Paid'],
            ].map(([id, amount, status]) => (
              <div
                key={id}
                className="grid grid-cols-3 items-center gap-3 py-2.5"
              >
                {loaded ? (
                  <>
                    <span className="font-mono text-xs text-muted">{id}</span>
                    <span className="font-medium text-foreground tabular-nums">
                      {amount}
                    </span>
                    <span
                      className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${
                        status === 'Paid'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {t(status)}
                    </span>
                  </>
                ) : (
                  <>
                    <Bone className="h-3 w-12" />
                    <Bone className="h-3.5 w-16" />
                    <Bone className="h-5 w-14" rounded="rounded-full" />
                  </>
                )}
              </div>
            ))}
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

function ProgressRing({ value }: { value: number }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  return (
    <div
      className="relative size-24"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          strokeWidth="7"
          className="stroke-surface-hover"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-500"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-foreground tabular-nums">
        {value}%
      </span>
    </div>
  )
}

function ProgressSection() {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(12)

  // Fake upload: climbs in uneven steps, then starts over
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) =>
        p >= 100 ? 0 : Math.min(100, p + Math.round(Math.random() * 12) + 3),
      )
    }, 700)
    return () => clearInterval(timer)
  }, [])

  const bars = [
    { label: 'Storage', value: 72, color: 'bg-primary' },
    { label: 'Bandwidth', value: 45, color: 'bg-success' },
    { label: 'API quota', value: 91, color: 'bg-danger' },
  ]

  return (
    <ShowcaseSection
      icon={Gauge}
      title="Progress"
      description="When you know how far along a task is"
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        <DemoCard title="Bars" code='role="progressbar"'>
          <div className="flex flex-col gap-y-4">
            {bars.map(({ label, value, color }) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium text-foreground">
                    {t(label)}
                  </span>
                  <span className="text-muted tabular-nums">{value}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label={t(label)}
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-2 overflow-hidden rounded-full bg-surface-hover"
                >
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DemoCard>

        <DemoCard
          title="Ring"
          code="<svg> stroke-dashoffset"
          description="A live, looping upload"
        >
          <div className="flex items-center gap-x-5">
            <ProgressRing value={progress} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {t('Uploading report.pdf')}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {progress >= 100
                  ? t('Done')
                  : t('{{value}}% of 4.2 MB', { value: progress })}
              </p>
            </div>
          </div>
        </DemoCard>

        <DemoCard
          title="Indeterminate"
          code="<BarLoader width='100%' />"
          description="When you don't know how long it takes"
        >
          <div className="flex flex-col gap-y-4">
            <div
              role="status"
              aria-label={t('Loading')}
              className="overflow-hidden rounded-full"
            >
              <BarLoader color="var(--color-primary)" width="100%" height={4} />
            </div>
            <div className="flex items-center gap-x-2 text-sm text-muted">
              <LoaderCircle size={16} className="animate-spin text-primary" />
              {t('Syncing your workspace...')}
            </div>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function LoaderShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Loaders"
        description="Spinners, skeletons and progress indicators — pick the one that matches how much you know about the wait."
        code='<MoonLoader color="var(--color-primary)" />'
        stats={[
          { value: 10, label: 'Spinners' },
          { value: 3, label: 'Skeletons' },
          { value: 3, label: 'Progress' },
        ]}
      />
      <SpinnersSection />
      <SkeletonsSection />
      <ProgressSection />
    </div>
  )
}

export default LoaderShowCase
