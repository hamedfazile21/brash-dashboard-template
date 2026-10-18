import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import {
  ArrowLeft,
  ChartPie,
  ChevronRight,
  House,
  ListTodo,
  MessageCircle,
  SearchX,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import UtilityLayout from '../components/utility-layout'

const quickLinks = [
  { title: 'Dashboard', subtitle: 'Overview & stats', to: '/', icon: House },
  {
    title: 'Chat',
    subtitle: 'Messages & contacts',
    to: '/chat',
    icon: MessageCircle,
  },
  {
    title: 'Charts',
    subtitle: 'Visual reports',
    to: '/charts',
    icon: ChartPie,
  },
  {
    title: 'To Do List',
    subtitle: 'Tasks for today',
    to: '/to-do-list',
    icon: ListTodo,
  },
] as const

// [cx, cy, r, animation delay in s]
const stars = [
  [40, 60, 2, 0],
  [120, 30, 1.5, 1.2],
  [470, 50, 2, 0.6],
  [500, 140, 1.5, 2],
  [30, 330, 1.5, 1.6],
  [210, 25, 1, 0.3],
  [380, 20, 1.5, 2.4],
  [490, 360, 2, 0.9],
  [150, 395, 1, 1.8],
  [330, 400, 1.5, 0.2],
] as const

/** "4 🪐 4" — the 0 is a ringed planet with a satellite in orbit */
function LostPlanet() {
  return (
    <svg
      viewBox="0 0 520 420"
      className="w-full max-w-lg select-none"
      aria-hidden
    >
      <defs>
        <linearGradient id="nf-digit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--foreground)' }} />
          <stop
            offset="100%"
            style={{ stopColor: 'var(--foreground)', stopOpacity: 0.08 }}
          />
        </linearGradient>
        <linearGradient id="nf-planet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--color-primary)' }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
        </linearGradient>
        <radialGradient id="nf-glow">
          <stop
            offset="0%"
            style={{ stopColor: 'var(--color-primary)', stopOpacity: 0.35 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: 'var(--color-primary)', stopOpacity: 0 }}
          />
        </radialGradient>
      </defs>

      {stars.map(([cx, cy, r, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          className="animate-twinkle fill-muted"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      <text
        x="92"
        y="290"
        textAnchor="middle"
        fontSize="230"
        fontWeight="800"
        letterSpacing="-8"
        fill="url(#nf-digit)"
      >
        4
      </text>
      <text
        x="428"
        y="290"
        textAnchor="middle"
        fontSize="230"
        fontWeight="800"
        letterSpacing="-8"
        fill="url(#nf-digit)"
      >
        4
      </text>

      {/* Orbit path */}
      <circle
        cx="260"
        cy="210"
        r="140"
        fill="none"
        strokeDasharray="2 8"
        strokeLinecap="round"
        className="stroke-muted/50"
        strokeWidth="1.5"
      />

      <circle cx="260" cy="210" r="130" fill="url(#nf-glow)" />

      {/* Back half of the ring sits behind the planet */}
      <g transform="translate(260 210) rotate(-18)">
        <path
          d="M -122 0 A 122 28 0 0 1 122 0"
          fill="none"
          strokeWidth="6"
          className="stroke-primary/35"
        />
      </g>

      <g className="animate-float transform-view">
        <circle cx="260" cy="210" r="72" fill="url(#nf-planet)" />
        {/* Craters + highlight */}
        <circle cx="232" cy="186" r="13" className="fill-white/20" />
        <circle cx="285" cy="236" r="9" className="fill-white/15" />
        <circle cx="290" cy="180" r="5" className="fill-white/20" />
        <circle cx="244" cy="240" r="6" className="fill-white/10" />
        <path
          d="M 210 180 A 60 60 0 0 1 260 146"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-white/40"
        />
      </g>

      {/* Front half of the ring crosses over the planet and the digits */}
      <g transform="translate(260 210) rotate(-18)">
        <path
          d="M -122 0 A 122 28 0 0 0 122 0"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-primary"
        />
      </g>

      {/* Satellite on the dashed orbit */}
      <g className="origin-[260px_210px] animate-[spin_16s_linear_infinite] transform-view">
        <g transform="translate(260 70) rotate(20)">
          <rect
            x="-7"
            y="-6"
            width="14"
            height="12"
            rx="2"
            className="fill-foreground"
          />
          <rect
            x="-27"
            y="-4"
            width="16"
            height="8"
            rx="1"
            className="fill-primary"
          />
          <rect
            x="11"
            y="-4"
            width="16"
            height="8"
            rx="1"
            className="fill-primary"
          />
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="-14"
            strokeWidth="1.5"
            className="stroke-foreground"
          />
          <circle cx="0" cy="-15" r="2" className="fill-danger" />
        </g>
      </g>
    </svg>
  )
}

function NotFoundPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <UtilityLayout>
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center lg:order-last">
          <LostPlanet />
        </div>

        <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-x-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {t('Error 404')}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('Lost in space')}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t(
              "The page you're looking for drifted out of orbit. It may have been moved, renamed, or never existed.",
            )}
          </p>

          <div className="glass mt-6 inline-flex max-w-full items-center gap-x-2 rounded-lg px-3 py-2 text-sm">
            <SearchX size={16} className="shrink-0 text-danger" />
            <code className="truncate font-mono text-foreground" dir="ltr">
              {pathname}
            </code>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="btn btn-primary btn-lg flex items-center gap-x-2"
            >
              <House size={18} />
              {t('Back to dashboard')}
            </Link>
            <button
              type="button"
              onClick={() => router.history.back()}
              className="btn btn-secondary btn-lg flex items-center gap-x-2"
            >
              <ArrowLeft size={18} className="rtl:rotate-180" />
              {t('Go back')}
            </button>
          </div>

          <div className="mt-12 w-full max-w-lg">
            <p className="mb-3 text-xs font-medium tracking-wider text-muted uppercase">
              {t('Popular destinations')}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {quickLinks.map(({ title, subtitle, to, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="card card-hover group flex items-center gap-x-3 p-3! text-start"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      {t(title)}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {t(subtitle)}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-muted transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UtilityLayout>
  )
}

export default NotFoundPage
