import { useTranslation } from 'react-i18next'
import { useAppSelector } from '#/hooks/redux'

/** 1,284 / 12.9K / 4.2M — for axis ticks and stat values */
export function compact(value: number, prefix = '', suffix = '') {
  const formatted = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
  return `${prefix}${formatted}${suffix}`
}

/** Recessive axis text: muted ink, small, never the series color */
export const axisTick = { fill: 'var(--muted-foreground)', fontSize: 12 }

/** Hairline, solid, horizontal-only grid */
export const gridProps = {
  stroke: 'var(--border)',
  strokeDasharray: undefined,
  vertical: false,
} as const

/** Markers ≥ 8px with a 2px ring in the surface color, so they stay legible over lines */
export const dotProps = (color: string) => ({
  r: 4,
  fill: color,
  stroke: 'var(--surface)',
  strokeWidth: 2,
})

/**
 * Charts read start→end like the text, so in RTL the category axis runs
 * right→left and the value axis sits on the right.
 */
export function useChartDirection() {
  const direction = useAppSelector((state) => state.themeConfig.direction)
  const rtl = direction === 'rtl'
  return {
    rtl,
    xAxis: { reversed: rtl },
    yAxis: { orientation: rtl ? ('right' as const) : ('left' as const) },
  }
}

interface TooltipEntry {
  name?: string
  value?: number | string
  color?: string
  payload?: { color?: string }
}

/** Token-styled tooltip shared by every chart; values in text ink, identity in the swatch */
export function ChartTooltip({
  active,
  payload,
  label,
  prefix = '',
  suffix = '',
}: {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
  prefix?: string
  suffix?: string
}) {
  const { t } = useTranslation()
  if (!active || !payload?.length) return null

  return (
    <div className="min-w-32 rounded-lg border border-borderColor bg-background/95 px-3 py-2 text-xs shadow-[0_8px_24px_-6px_rgb(0_0_0/0.2)] backdrop-blur-xl dark:bg-surface/95">
      {label && (
        <p className="mb-1.5 font-semibold text-foreground">{t(label)}</p>
      )}
      <div className="flex flex-col gap-y-1">
        {payload.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-x-4"
          >
            <span className="flex items-center gap-x-1.5 text-muted">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color ?? item.payload?.color }}
              />
              {t(item.name ?? '')}
            </span>
            <span className="font-semibold text-foreground tabular-nums">
              {prefix}
              {typeof item.value === 'number'
                ? item.value.toLocaleString('en')
                : item.value}
              {suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Legend in text ink with a colored key beside each label */
export function ChartLegend({
  items,
}: {
  items: { label: string; color: string; dashed?: boolean }[]
}) {
  const { t } = useTranslation()
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
      {items.map(({ label, color, dashed }) => (
        <li key={label} className="flex items-center gap-x-1.5">
          <span
            className="h-0.5 w-3.5 rounded-full"
            style={
              dashed
                ? {
                    backgroundImage: `linear-gradient(to right, ${color} 55%, transparent 55%)`,
                    backgroundSize: '5px 2px',
                  }
                : { backgroundColor: color }
            }
          />
          {t(label)}
        </li>
      ))}
    </ul>
  )
}
